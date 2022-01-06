<?php
    class Carioca {
        public $gameId = 0;
        public $roundId = 0;
        public $users = array();

        public function __construct($gameId, $roundId) {
            $this->gameId = $gameId;
            $this->roundId = $roundId;
        }
    }
?>