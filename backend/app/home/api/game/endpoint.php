<?php
    class Endpoint {
        public $httpVerb = "";
        public $path = "";
        public $headers = "";
        public $body = "";

        public function __construct($httpVerb, $path, $headers, $body) {
            $this->httpVerb = $httpVerb;
            $this->path = $path;
            $this->headers = $headers;
            $this->body = $body;
        }
    }
?>