package PhelipeProject.EncurtadorDeUrl.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RecordUrlEncurtada(String result_url) {

}
