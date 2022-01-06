<?php
    class Point {
        public $roundId = 0;
        public $roundName = "";
        public $points = 0;

        public function __construct($roundId, $roundName, $points) {
            $this->roundId = $roundId;
            $this->roundName = $roundName;
            $this->points = $points;
        }
    }
?>