import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

//import org.apache.log4j.Logger;
import org.slf4j.LoggerFactory;

import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;


/**
 * Created by Jagadeeshwar on 8/1/15.
 */
public class TestKafkaProducer {
    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(TestKafkaProducer.class);

    final static String TOPIC = "test";


    public static void main(String[] argv){
        Properties properties = new Properties();
        properties.put("metadata.broker.list","localhost:9092");
        properties.put("serializer.class","kafka.serializer.StringEncoder");
        try {
            ProducerConfig producerConfig = new ProducerConfig(properties);        
            kafka.javaapi.producer.Producer<String,String> producer = new kafka.javaapi.producer.Producer<String, String>(producerConfig);
        SimpleDateFormat sdf = new SimpleDateFormat();
        KeyedMessage<String, String> message =new KeyedMessage<String, String>(TOPIC,"Test message 4 from java program " + sdf.format(new Date()));
        producer.send(message);
        System.out.println("Message sent");
        producer.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
    }
}