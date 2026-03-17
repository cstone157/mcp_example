FROM timescale/timescaledb-ha:pg16

## Install Elastic Agent
RUN curl -L -O --output-dir /tmp https://artifacts.elastic.co/downloads/beats/elastic-agent/elastic-agent-9.3.1-linux-arm64.tar.gz
RUN tar xzvf /tmp/elastic-agent-9.3.1-linux-arm64.tar.gz -C /tmp
RUN echo "ls /tmp"
RUN ls /tmp
RUN echo "ls /tmp/elastic-agent-9.3.1-linux-arm64"
RUN ls /tmp/elastic-agent-9.3.1-linux-arm64
# RUN /tmp/elastic-agent-9.3.1-linux-arm64/elastic-agent install

WORKDIR /home/postgres
USER postgres
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["/tmp/elastic-agent-9.3.1-linux-arm64/elastic-agent install && postgres"]