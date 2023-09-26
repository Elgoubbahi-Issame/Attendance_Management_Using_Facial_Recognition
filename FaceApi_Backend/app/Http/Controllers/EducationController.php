<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EducationController extends Controller
{
    public function store(Request $request)
    {
        //
        $education = new Education();
        $education->classroom_id = htmlspecialchars($request->input('classroom_id'));
        $education->module_id = htmlspecialchars($request->input('module_id'));
        $education->teacher_id = htmlspecialchars($request->input('teacher_id'));
        $education->save();
        return response()->json([
            'status' => 224,
            'message' => "Le Salle est bien ajouté !!!"
        ]);
    }
    public function index()
    {
        $classrrom =  DB::table('education')->select('education.id', 'modules.name as ModuleName', 'teachers.last_name', 'teachers.first_name', 'classrooms.name as ClassName', 'classrooms.classroom_id', 'modules.module_id', 'teachers.teacher_id',)->join('teachers', 'teachers.teacher_id', "=", 'education.teacher_id')->join('modules', 'modules.module_id', "=", 'education.module_id')->join('classrooms', 'classrooms.classroom_id', "=", 'education.classroom_id')->get();
        return [
            'classroom' => $classrrom
        ];
    }
    public function destroy($id)
    {
        //
        DB::table('education')->where('id', $id)->delete();
        return response()->json([
            'status' => 224,
            'message' => "Suppression recue"
        ]);
    }
}
