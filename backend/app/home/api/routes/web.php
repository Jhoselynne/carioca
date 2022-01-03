<?php

use Illuminate\Http\Request;

/** @var \Laravel\Lumen\Routing\Router $router */

require __DIR__.'/../game/user.php';
require __DIR__.'/../game/point.php';
require __DIR__.'/../game/carioca.php';
require __DIR__.'/../game/endpoint.php';

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

function authenticated(Request $request) {
    $user = Auth::user();
    $user = $request->user();
}

$router->get('version', ['middleware' => 'auth', function (Request $request) use ($router) {
    authenticated($request);
    return $router->app->version();
}]);

$router->post('login', ['middleware' => 'auth', function (Request $request) {
    authenticated($request);
    $content = "Login functionality coming soon here!";
    return response($content)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'POST')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With');
}]);

$router->get('user[/{id:[0-9]+}]', ['middleware' => 'auth', function (Request $request, $id = null) {
    authenticated($request);
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
}]);

$router->get('round[/{id:[0-9]+}]', ['middleware' => 'auth', function (Request $request, $id = null) {
    authenticated($request);
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
}]);

$router->get('game/{id:[0-9]+}', ['middleware' => 'auth', function (Request $request, $id = null) {
    authenticated($request);
    $table = 'carioca_game';
    $results = app('db')->select("SELECT id, round_id FROM $table WHERE id = $id");
    $results = isset($results[0]) ? $results[0] : null;
    return response()
        ->json($results)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With');
}]);

$router->get('score/game/{game_id:[0-9]+}', ['middleware' => 'auth', function (Request $request, $game_id) {
    authenticated($request);

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
}]);

$router->get('endpoint', ['middleware' => 'auth', function (Request $request) {
    authenticated($request);
    $endpoints = array(
        new Endpoint('GET', 'https://illanes.com/carioca/api/public/version'),
        new Endpoint('GET', 'https://illanes.com/carioca/api/public/user'),
        new Endpoint('GET', 'https://illanes.com/carioca/api/public/user/{id}'),
        new Endpoint('GET', 'https://illanes.com/carioca/api/public/round'),
        new Endpoint('GET', 'https://illanes.com/carioca/api/public/round/{id}'),
        new Endpoint('GET', 'https://illanes.com/carioca/api/public/game/{id}'),
        new Endpoint('GET', 'https://illanes.com/carioca/api/public/score/game/{id}'),
        new Endpoint('POST', 'https://illanes.com/carioca/api/public/login'),
    );
    return response(json_encode($endpoints, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With');
}]);

// Catch all route
$router->get('[{path:.*}]', ['middleware' => 'auth', function (Request $request, $path = null) use ($router) {
    authenticated($request);
    return 'Path \'' . $path . '\' was not found.';
}]);
