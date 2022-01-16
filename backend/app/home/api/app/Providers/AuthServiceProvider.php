<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Auth\GenericUser;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

use ReallySimpleJWT\Jwt;
use ReallySimpleJWT\Parse;
use ReallySimpleJWT\Validate;
use ReallySimpleJWT\Decode;
use ReallySimpleJWT\Encoders\EncodeHS256;
use ReallySimpleJWT\Helper\Validator;
use ReallySimpleJWT\Exception\BuildException;
use ReallySimpleJWT\Exception\ParseException;
use ReallySimpleJWT\Exception\TokensException;
use ReallySimpleJWT\Exception\ValidateException;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        // $this->app['auth']->viaRequest('api', function ($request) {
        //     if ($request->input('api_token')) {
        //         return User::where('api_token', $request->input('api_token'))->first();
        //     }
        // });

        $this->app['auth']->viaRequest('api', function ($request) {
            $secret = '0c9bac13f5734c6ea1264643d6f60a16';

            if ($request->is('version')) {
                return new GenericUser(['id' => 1, 'name' => 'AuthenticatedUser']);
            }

            $valid_api_key = false;
            if($request->header('x-api-key') === $secret) {
                $valid_api_key = true;
            } else {
                return null;
            }

            if ($request->is('login')) {
                return new GenericUser(['id' => 1, 'name' => 'AuthenticatedUser']);
            }

            $valid_id_token = false;
            if($request->header('Authorization') && str_starts_with($request->header('Authorization'), 'Bearer ')) {
                $token = preg_replace('/^Bearer /', '', $request->header('Authorization'));
                $token_secret = 'TvJH3&B&tD5s2Y';
                $jwt = new Jwt($token, $token_secret);
                $parse = new Parse($jwt, new Decode());
                $validate = new Validate(
                    $parse,
                    new EncodeHS256(),
                    new Validator()
                );

                try {
                    // confirms the structure of the token is correct.
                    $validate->structure();

                    // confirms the token signature is valid.
                    $validate->signature();

                    // confirms the token expiration claim (exp) has not expired.
                    $validate->expiration();

                    // confirms the token not before claim (nbf) has elapsed.
                    $validate->notBefore();

                    // confirms the token audience claim (aud) matches what is expected.
                    $validate->audience('https://illanes.com');

                    // confirms the token algorithm claim (alg) matches what is expected and is valid
                    $validate->algorithm(['HS256']);

                    // confirms the token algorithm claim (alg) is not set to none.
                    $validate->algorithmNotNone();
                } catch (BuildException $e) {
                    return null;
                } catch (ParseException $e) {
                    return null;
                } catch (TokensException $e) {
                    return null;
                } catch (ValidateException $e) {
                    return null;
                }

                $payload = $parse->parse()->getPayload();

                if ($payload) {
                    $valid_id_token = true;
                }
            }

            if ($valid_api_key && $valid_id_token) {
                return new GenericUser(['id' => 1, 'name' => 'AuthenticatedUser']);
            } else {
                return null;
            }
        });
    }
}
