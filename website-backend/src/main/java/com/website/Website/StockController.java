package com.website.Website;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.core.ParameterizedTypeReference;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    private final WebClient webClient;

    private final String apiKey = "Q8VsVNrflkHzdvYpEdroojQoqpmfX305";

    public StockController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://financialmodelingprep.com/api/v3").build();
    }



// other imports

    @GetMapping("/{symbol}")
    public Mono<ResponseEntity<Map<String, Object>>> getStockInfo(@PathVariable String symbol) {

        // 获取公司信息
        Mono<Map<String, Object>[]> companyInfoMono = webClient.get()
                .uri("/profile/{symbol}?apikey={apiKey}", symbol, apiKey)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>[]>() {});

        // 获取过去10天的股票价格数据
        Mono<Map<String, Object>> stockDataMono = webClient.get()
                .uri("/historical-price-full/{symbol}?timeseries=10&apikey={apiKey}", symbol, apiKey)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {});

        return Mono.zip(companyInfoMono, stockDataMono)
                .flatMap(tuple -> {
                    Map<String, Object>[] companyInfoArray = tuple.getT1();
                    Map<String, Object> stockDataResult = tuple.getT2();

                    if (companyInfoArray == null || companyInfoArray.length == 0) {
                        return Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "No matching symbol found")));
                    }

                    if (stockDataResult == null || !stockDataResult.containsKey("historical")) {
                        return Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "No stock data found")));
                    }

                    Map<String, Object> companyInfo = companyInfoArray[0];

                    // 提取历史数据
                    List<Map<String, Object>> historicalData = (List<Map<String, Object>>) stockDataResult.get("historical");

                    // 获取最新的数据点
                    Map<String, Object> latestStockData = historicalData.get(0);

                    String companyName = (String) companyInfo.get("companyName");
                    String stockPrice = latestStockData.get("close").toString();
                    String latestTime = (String) latestStockData.get("date");

                    // 构建响应
                    Map<String, Object> response = new HashMap<>();
                    response.put("name", companyName);
                    response.put("symbol", symbol);
                    response.put("price", stockPrice);
                    response.put("time", latestTime);
                    response.put("historicalData", historicalData); // 添加历史数据

                    return Mono.just(ResponseEntity.ok(response));
                });
    }
}
