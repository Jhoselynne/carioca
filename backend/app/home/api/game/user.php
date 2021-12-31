<?php
    class User {
        public $userId = 0;
        public $userName = "";
        public $points = array();

        public function __construct($userId, $userName) {
            $this->userId = $userId;
            $this->userName = $userName;
        }
    }
?>