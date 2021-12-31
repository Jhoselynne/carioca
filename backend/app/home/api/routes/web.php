<?php

/** @var \Laravel\Lumen\Routing\Router $router */

require __DIR__.'/../game/user.php';
require __DIR__.'/../game/point.php';
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

// $router->get('info', function () {
//     return phpinfo();
// });

$router->get('version', function () use ($router) {
    return $router->app->version();
});

$router->post('login', function () {
    $content = "Login functionality coming soon here!";
    return response($content)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'POST')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With');
});

$router->get('user[/{id:[0-9]+}]', function ($id = null) {
    $table = 'carioca_user';
    if (!empty($id)) {
        $results = app('db')->select("SELECT id, name FROM $table WHERE id = $id");
        $results = isset($results[0]) ? $results[0] : null;
    } else {
        $results = app('db')->select("SELECT id, name FROM $table");
    }
    return response()
        ->json($results)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With');
});

$router->get('round[/{id:[0-9]+}]', function ($id = null) {
    $table = 'carioca_round';
    if (!empty($id)) {
        $results = app('db')->select("SELECT id, name FROM $table WHERE id = $id");
        $results = isset($results[0]) ? $results[0] : null;
    } else {
        $results = app('db')->select("SELECT id, name FROM $table");
    }
    return response()
        ->json($results)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With');
});

$router->get('game/{id:[0-9]+}', function ($id = null) {
    $table = 'carioca_game';
    $results = app('db')->select("SELECT id, round_id FROM $table WHERE id = $id");
    $results = isset($results[0]) ? $results[0] : null;
    return response()
        ->json($results)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With');
});

$router->get('score/game/{game_id:[0-9]+}', function ($game_id) {

    $game_result = app('db')->select("SELECT id, round_id FROM carioca_game WHERE id = $game_id");
    $game_exist = !empty($game_result) ? true : false;
    $game = "Game does not exist";
    if ($game_exist) {
        $game = new Carioca($game_result[0]->id, $game_result[0]->round_id);

        $users = app('db')->select("SELECT DISTINCT s.user_id AS id, u.name FROM carioca_score s INNER JOIN carioca_user u ON s.user_id = u.id WHERE s.game_id = $game->gameId");
        foreach ($users as $user_item) {
            $user = new User($user_item->id, $user_item->name);
            array_push($game->users, $user);

            $points = app('db')->select("SELECT s.round_id AS id, r.name, s.points FROM carioca_score s INNER JOIN carioca_round r ON s.round_id = r.id WHERE game_id = $game->gameId AND user_id = $user->userId ORDER BY id ASC");
            foreach ($points as $point_item) {
                $point = new Point($point_item->id, $point_item->name, $point_item->points);
                array_push($user->points, $point);
            }
        }
    }

    // $scores = app('db')->select("SELECT user_id, SUM(points) AS total_points FROM carioca_score WHERE game_id = $game_id GROUP BY user_id");
    // $scores = app('db')->select("SELECT game_id, user_id, round_id, points FROM carioca_score WHERE game_id = $game_id");

    return response()
        ->json($game)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With');
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
                            <td>GET</td>
                            <td>https://illanes.com/carioca/api/public/version</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>https://illanes.com/carioca/api/public/user</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>https://illanes.com/carioca/api/public/user/{id}</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>https://illanes.com/carioca/api/public/round</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>https://illanes.com/carioca/api/public/round/{id}</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>https://illanes.com/carioca/api/public/game/{id}</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>https://illanes.com/carioca/api/public/score/game/{id}</td>
                        </tr>
                        <tr>
                            <td>POST</td>
                            <td>https://illanes.com/carioca/api/public/login</td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>
    ';
    return $html;
});

// Catch all route
$router->get('[{path:.*}]', function ($path = null) use ($router) {
    return 'Path \'' . $path . '\' was not found.';
});
