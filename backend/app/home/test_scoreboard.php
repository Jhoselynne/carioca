<?
    class User {
        public $userName = "";
        public $points = 0;

        public function __construct($userName, $points) {
            $this->userName = $userName;
            $this->points = $points;
        }
    }

    class Carioca {
        public $gameId = 43219876;
        public $ongoingGame = "2 trio 1 scale";
        public $scoreBoard = array();
    }

    $carioca = new Carioca();
    array_push($carioca->scoreBoard, new User("Alex", 175));
    array_push($carioca->scoreBoard, new User("Marta", 90));
    array_push($carioca->scoreBoard, new User("Yasemin", 195));
    array_push($carioca->scoreBoard, new User("Christian", 205));
    array_push($carioca->scoreBoard, new User("Jhoselynne", 120));

    $json = json_encode($carioca);
    // $json = json_encode($carioca, JSON_PRETTY_PRINT);

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");

    print($json);
    // print("<pre>" . $json . "</pre>");
?>