package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	http.HandleFunc("/crypto-data", handleCryptoData)
	http.ListenAndServe(":8080", nil)
}

func handleCryptoData(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST requests are supported", http.StatusMethodNotAllowed)
		return
	}

	// Read the request body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}

	// Unmarshal the JSON payload
	var requestBody map[string]string
	if err := json.Unmarshal(body, &requestBody); err != nil {
		http.Error(w, "Error decoding JSON payload", http.StatusBadRequest)
		return
	}

	// Extract crypto name and timeframe from the request body
	cryptoName := requestBody["cryptoName"]
	timeframe := requestBody["timeframe"]

	// Make a request to the CoinGecko API
	apiURL := fmt.Sprintf("https://api.coingecko.com/api/v3/coins/%s/market_chart", cryptoName)
	params := map[string]string{"vs_currency": "usd", "days": timeframe}
	apiResponse, err := makeAPIRequest(apiURL, params)
	if err != nil {
		http.Error(w, "Error fetching data from CoinGecko API", http.StatusInternalServerError)
		return
	}

	// Forward the API response to the client
	w.Header().Set("Content-Type", "application/json")
	w.Write(apiResponse)
}

func makeAPIRequest(url string, params map[string]string) ([]byte, error) {
	// Prepare the request
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	// Add query parameters to the request
	q := req.URL.Query()
	for key, value := range params {
		q.Add(key, value)
	}
	req.URL.RawQuery = q.Encode()

	// Make the request
	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return body, nil
}
