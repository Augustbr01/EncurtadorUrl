package PhelipeProject.EncurtadorDeUrl.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

@Service
public class ObterUrlEncurtada {


    public String obterUrl(String url) throws IOException, InterruptedException {

        if(!url.contains("://")) {
            throw new IllegalArgumentException("Formato inválido");
        }

        String json = """
                {
                    "url": "%s"
                }
                """.formatted(url);

        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://cleanuri.com/api/v1/shorten"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());


        return response.body();
    }
}
