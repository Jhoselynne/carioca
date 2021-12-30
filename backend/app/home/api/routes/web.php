<?php

/** @var \Laravel\Lumen\Routing\Router $router */

require __DIR__.'/../game/user.php';
require __DIR__.'/../game/carioca.php';

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

$router->get('info', function () {
    return phpinfo();
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

$router->get('user[/{id:[0-9]+}]', function ($id = null) {
    $results = 'user called with id = \'' . $id . '\'';
    if (!empty($id)) {
        $results = app('db')->select("SELECT host, user FROM user WHERE user_id = $id");
    } else {
        $results = app('db')->select("SELECT host, user FROM user");
    }
    return $results;
});

// Catch all route
$router->get('[{path:.*}]', function ($path = null) use ($router) {
    return $router->app->version() . '<br /><br />path \'' . $path . '\' was not found.';
});
