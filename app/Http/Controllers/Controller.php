<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public static function response($data = null, $message = '', $status_code = 200)
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
            'status_code' => $status_code,
            'payload' => request()->all(),
        ], $status_code);
    }

    public static function send_validation_errors($errors = null)
    {
        return response()->json([
            'message' => $errors->first(),
            'data' => $errors,
            'status_code' => 422,
            'payload' => request()->all(),
        ], 422);
    }
}
