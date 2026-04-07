package PhelipeProject.EncurtadorDeUrl.service;

import PhelipeProject.EncurtadorDeUrl.dto.RecordUrlEncurtada;
import PhelipeProject.EncurtadorDeUrl.dto.RequestUrl;
import PhelipeProject.EncurtadorDeUrl.dto.ResponseUrl;
import PhelipeProject.EncurtadorDeUrl.entity.EntityUrl;
import PhelipeProject.EncurtadorDeUrl.repository.RepositoryUrl;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Optional;

@Service
public class ServiceUrl {

    private final RepositoryUrl repositoryUrl;
    private final ObterUrlEncurtada obterUrlEncurtada;

    public ServiceUrl(RepositoryUrl repositoryUrl,ObterUrlEncurtada obterUrlEncurtada) {
        this.repositoryUrl = repositoryUrl;
        this.obterUrlEncurtada = obterUrlEncurtada;
    }

    public ResponseUrl urlEncurtadaBanco(RequestUrl url) throws IOException, InterruptedException {

        Optional<EntityUrl> exist = repositoryUrl.findByUrl(url.getUrl());

        if(exist.isPresent()) {
            return new ResponseUrl(false, "Url encurtada já existe");
        }

        ObjectMapper objectMapper = new ObjectMapper();

        String json = obterUrlEncurtada.obterUrl(url.getUrl());

        RecordUrlEncurtada record = objectMapper.readValue(json, RecordUrlEncurtada.class);

        EntityUrl entityUrl = new EntityUrl(url.getUrl(),record.result_url());

        repositoryUrl.save(entityUrl);

        return new ResponseUrl(true,record.result_url());
    }

    public ResponseUrl removeUrlEncurtada(RequestUrl url) {

        Optional<EntityUrl> exist = repositoryUrl.findByUrl(url.getUrl());

        if(exist.isEmpty()) {
            return new ResponseUrl(false, "Url não existe");
        }

        EntityUrl entity = exist.get();

        repositoryUrl.deleteById(entity.getId());

        return new ResponseUrl(true, "Url removida com sucesso");
    }
}
