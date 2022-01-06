<?php
    class Endpoint {
        public $httpVerb = "";
        public $path = "";

        public function __construct($httpVerb, $path) {
            $this->httpVerb = $httpVerb;
            $this->path = $path;
        }
    }
?>