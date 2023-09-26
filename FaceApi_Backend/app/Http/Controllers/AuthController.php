<?php

namespace App\Http\Controllers;


use App\Models\Teacher;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{

    public function register(Request $request)
    {
        // $classroom = null;
        $fields = $request->validate([
            'full_name' => 'required|string',
            'CIN' => 'required|string',
            'file' => 'required',
            'Class' => 'required|string'
        ]);

        $full_name = explode(" ", $fields['full_name']);
        $classroom = DB::table('classrooms')->select('classroom_id')->whereRaw('LOWER(`name`) LIKE ?', [trim(strtolower($fields['Class'])) . '%'])->get();
        // $sess = array();
        // $sess =  DB::table('sessions')->select('session_id')->join('education', 'sessions.module_id', "=", 'education.module_id')->where('education.classroom_id', $classroom[0]->classroom_id)->get();
        //verifie email

        if (sizeof($full_name) == 2) {
            if (sizeof($classroom) > 0) {
                $image_path = $request->file('file')->store('images');
                $Student = Student::create([
                    'CIN' => $fields['CIN'],
                    'first_name' => $full_name[0],
                    'last_name' => $full_name[1],
                    'validation' => 0,
                    'image' => $image_path,
                    'classroom_id' => $classroom[0]->classroom_id
                ]);
                // foreach ($sess as $key => $value1) {
                //     DB::table('session_students')->insert([
                //         'CIN' => $fields['CIN'],
                //         'session_id' => $value1->session_id
                //     ]);
                // }
                $token = $Student->createToken('MonToken')->plainTextToken;
                $response = [
                    'Student' => $Student,
                    'token' => $token,
                    'message' => 'true',
                    // 'class' =>  $sess, $classroom
                ];

                return response($response);
            } else {
                return response([
                    'message' => 'there is no class with that name ??',
                ]);
            }
        } else {
            return response([
                'message' => 'full name must be with two word',
            ]);
        }
    }
    public function login(Request $request)
    {
        $fields = $request->validate([

            'full_name' => 'required|string',
            'email' => 'required|string'

        ]);

        $full_name = explode(" ", $fields['full_name']);

        //verifie email

        if (sizeof($full_name) == 2) {
            $teacher = Teacher::select('teacher_id')->where('email', $fields['email'])->where('first_name', $full_name[0])->where('last_name', $full_name[1])->first();
        } else {
            return response([
                'message' => 'full name must be with two word',
            ]);
        }
        // verifie last_name :
        if (!$teacher) {
            // || $fields['last_name'] != $teacher->last_name

            return response([
                'message' => 'email ou full_name incorrect',
            ]);
        }
        $token = $teacher->createToken('MonToken')->plainTextToken;
        $response = [
            'message' => 'Success',
            'teacher' => $teacher,
            'token' => $token,
        ];

        return response($response, 201);
    }
    public function logout()
    {

        auth()->user()->tokens()->delete();
        return [
            'message' => 'logged out succesfuly'
        ];
    }
}
