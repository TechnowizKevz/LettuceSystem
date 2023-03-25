<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Roles;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserController extends Controller
{
    public function index()
    {
        $users=User::whereNull('deleted_at')->get();
        return response()->json($users);
    }

    public function index2()
    {
        $users=User::whereNotNull('deleted_at')->get();
        return response()->json($users);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $users=User::create($input); 
        return response()->json($users);
    }

    public function list()
    { 
        $roles= Roles::whereNull('deleted_at')
                        ->orderby('id', 'desc')
                        ->get();
        return response()->json($roles);
    }

    public function update(Request $request, User $users)
    {
        $input = $request->all();
        $users->update($input);
        return response()->json($users, 200);
    }

    public function destroy(User $users)
    {
        $users->deleted_at = Carbon::now();
        $users->update();
        return response()->json(array('success'=>true));
    }

    public function recover(User $users)
    {
        $users->deleted_at = NULL;
        $users->update();
        return response()->json(array('success'=>true));
    }
}
