FROM node:8.12-stretch

# Add the application
ADD . /app
WORKDIR /app

# Fix permissions (useful if the host is Windows)
RUN chmod +x docker/install.sh docker/start.sh

CMD ["/app/docker/start.sh"]