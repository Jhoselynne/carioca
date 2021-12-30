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

$router->post('login', function () {
    return "Login functionality coming soon here!";
});

$router->get('endpoint', function () {
    $html = '
        <!doctype html>

        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Carioca endpoints</title>
            </head>
            <body>
                <table>
                    <tbody>
                        <tr>
                            <td>HOST</td>
                            <td>https://illanes.com</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>/carioca/api/public/user</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>/carioca/api/public/user/{id}</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>/carioca/api/public/round</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>/carioca/api/public/round/{id}</td>
                        </tr>
                        <tr>
                            <td>POST</td>
                            <td>/carioca/api/public/login</td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    ';
    return $html;
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
    $table = 'carioca_user';
    if (!empty($id)) {
        $results = app('db')->select("SELECT id, name FROM $table WHERE id = $id");
    } else {
        $results = app('db')->select("SELECT id, name FROM $table");
    }
    return $results;
});

$router->get('round[/{id:[0-9]+}]', function ($id = null) {
    $table = 'carioca_round';
    if (!empty($id)) {
        $results = app('db')->select("SELECT id, name FROM $table WHERE id = $id");
    } else {
        $results = app('db')->select("SELECT id, name FROM $table");
    }
    return $results;
});

// Catch all route
$router->get('[{path:.*}]', function ($path = null) use ($router) {
    // return $router->app->version() . '<br /><br />path \'' . $path . '\' was not found.';
    return 'Path \'' . $path . '\' was not found.';
});
