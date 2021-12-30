<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$app = require __DIR__.'/../game/user.php';
$app = require __DIR__.'/../game/carioca.php';

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->get('scoreboard', function () {
    $carioca = new Carioca();
    array_push($carioca->scoreBoard, new User("Alex", 175));
    array_push($carioca->scoreBoard, new User("Marta", 90));
    array_push($carioca->scoreBoard, new User("Yasemin", 195));
    array_push($carioca->scoreBoard, new User("Christian", 205));
    array_push($carioca->scoreBoard, new User("Jhoselynne", 120));
    $json = json_encode($carioca);
    return $json;
});
