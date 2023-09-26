<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassromController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// ************************ Protected Route **************************
Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/student/lists', [StudentController::class, 'indexall']);
    Route::get('/student/list', [StudentController::class, 'index_l1']);
    Route::match(['post', 'get'], '/teacher/list', [TeacherController::class, 'index']);
    Route::get('/teacher/list/{id}', [TeacherController::class, 'index1']);

    // ************************ Logout **************************
    Route::post('/logout', [AuthController::class, 'logout']);
});
/** ************Students Routing ******************** */
Route::match(['post', 'get'], '/student/store', [StudentController::class, 'store']);
// Route::match(['post', 'get'], '/student/lists', [StudentController::class, 'index']);
Route::match(['post', 'get'], '/student/showStudent/{id}', [StudentController::class, 'show']);
Route::match(['post', 'get'], '/student/update/{id}', [StudentController::class, 'update']);
Route::match(['post', 'get'], '/student/delete/{id}', [StudentController::class, 'destroy']);
Route::get('/nonVildatedStudents', [StudentController::class, 'nonValidatedStudents']);
Route::post('/validerStudent/{cin}', [StudentController::class, 'valider']);

//___________________________________________________________________________________


/** ************classrooms Routing ******************** */
Route::match(['post', 'get'], '/classroom/list', [ClassromController::class, 'index']);
Route::match(['post', 'get'], '/classroom/store', [ClassromController::class, 'store']);
Route::match(['post', 'get'], '/classroom/update/{id}', [ClassromController::class, 'update']);
Route::match(['post', 'get'], '/classroom/delete/{id}', [ClassromController::class, 'destroy']);
//________________________________________________________________________________


/** ************Teachers Routing ******************** */

Route::match(['post', 'get'], '/teacher/list', [TeacherController::class, 'index']);
Route::match(['post', 'get'], '/teacher/store', [TeacherController::class, 'store']);
Route::match(['post', 'get'], '/teacher/update/{id}', [TeacherController::class, 'update']);
Route::match(['post', 'get'], '/teacher/delete/{id}', [TeacherController::class, 'destroy']);
//_____________________________________________________________________________________

/** ************Modules Routing ******************** */

Route::match(['post', 'get'], '/module/list', [ModuleController::class, 'index']);
Route::match(['post', 'get'], '/module/store', [ModuleController::class, 'store']);
Route::match(['post', 'get'], '/module/update/{id}', [ModuleController::class, 'update']);
Route::match(['post', 'get'], '/module/delete/{id}', [ModuleController::class, 'destroy']);

//_____________________________________________________________________________________

/** ************Education Routing ******************** */

Route::match(['post', 'get'], '/education/store', [EducationController::class, 'store']);
Route::match(['post', 'get'], '/education/list', [EducationController::class, 'index']);
Route::match(['post', 'get'], '/education/delete/{id}', [EducationController::class, 'destroy']);

//_____________________________________________________________________________________

/** ************Sessions Routing ******************** */

Route::match(['post', 'get'], '/session/list', [SessionController::class, 'index']);
Route::match(['post', 'get'], '/session/start', [SessionController::class, 'startSession']);
Route::match(['post', 'get'], '/session/update/{id}', [SessionController::class, 'update']);
Route::match(['post', 'get'], '/session/delete/{id}', [SessionController::class, 'destroy']);
//_____________________________________________________________________________________

// __________________________Public route_______________________________
// ************************ Register and login **************************
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
