<?
    class User {
        public $userName = "";
        public $points = 0;

        public function __construct($userName, $points) {
            $this->userName = $userName;
            $this->points = $points;
        }
    }
?>