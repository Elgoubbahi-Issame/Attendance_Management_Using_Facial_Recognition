<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\Session;
use App\Models\Education;
use App\Models\Module;
use App\Models\Classroom;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $list_teacher = Teacher::all();
        return response()->json([
            'status' => 224,
            'list_teacher' => $list_teacher,
        ]);
    }

    public function index1($id)
    {

        $query = DB::table('sessions')->select('session_id', 'first_name', 'last_name', 'email', 'session_date', 'start_hour', 'end_hour', 'modules.name')->join('teachers', 'teachers.teacher_id', "=", 'sessions.teacher_id')->join('modules', 'modules.module_id', "=", 'sessions.module_id')->where('teachers.teacher_id', $id)->get()->toArray();
        $id_mod = DB::table('teachers')->select('module_id')->join('sessions', 'teachers.teacher_id', "=", 'sessions.teacher_id')->where('teachers.teacher_id', $id)->get()->toArray();
        $module =  DB::table('education')->select('modules.name', 'modules.module_id',)->join('teachers', 'teachers.teacher_id', "=", 'education.teacher_id')->join('modules', 'modules.module_id', "=", 'education.module_id')->join('classrooms', 'classrooms.classroom_id', "=", 'education.classroom_id')->where('education.teacher_id', $id)->get();
        $classrrom =  DB::table('education')->select('classrooms.name', 'classrooms.classroom_id')->join('teachers', 'teachers.teacher_id', "=", 'education.teacher_id')->join('modules', 'modules.module_id', "=", 'education.module_id')->join('classrooms', 'classrooms.classroom_id', "=", 'education.classroom_id')->where('education.teacher_id', $id)->get();
        $query1 = array();
        if ($query) {
            foreach ($id_mod as $key => $value) {
                foreach ($value as $key1 => $value1) {
                    $query1_1[$key] = DB::table('education')->select('classrooms.name', 'max_student')->join('teachers', 'teachers.teacher_id', "=", 'education.teacher_id')->join('modules', 'modules.module_id', "=", 'education.module_id')->join('classrooms', 'classrooms.classroom_id', "=", 'education.classroom_id')->where('education.teacher_id', $id)->where('education.module_id', $value1)->get();
                }
            }
            foreach ($query1_1 as $key => $value) {
                foreach ($value as $key1 => $value1) {
                    array_push($query1, $value1);
                }
            }
            // array_unique($query1)
            // $QUERY = array_merge($query, $query1);

            return [
                'Session_Teacher_Module' => $query,
                'classroom_session' => $query1,
                'module' => $module,
                'classroom' => $classrrom
            ];
        } else {
            return [
                'Session_Teacher_Module' => null,
                'classroom_session' => null,
                'message' => "You didn't have any Session Yet  : ) ",
                'module' => $module,
                'classroom' => $classrrom
            ];
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $teacher = new Teacher();
        $teacher->first_name = htmlspecialchars($request->input('first_name'));
        $teacher->last_name = htmlspecialchars($request->input('last_name'));
        $teacher->email = htmlspecialchars($request->input('email'));
        $teacher->save();
        return response()->json([
            'status' => 224,
            'message' => "Le professeur est bien ajouté !!!"
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $teacher = DB::table('teachers')->find($id);
        return response()->json([
            'status' => 224,
            'teacher' => $teacher,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        DB::table('teachers')->where('teacher_id', $id)->update([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
        ]);

        return response()->json([
            'status' => 224,
            'message' => "Modification recue !!!"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        DB::table('teachers')->where('teacher_id', $id)->delete();
        return response()->json([
            'status' => 224,
            'message' => "Le Professeur est supprimé"
        ]);
    }

    //authentification pour le professeur

}
