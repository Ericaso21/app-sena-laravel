<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WorkingDaily\WorkingDailyController;
use App\Http\Controllers\TrainingProgram\TrainingProgramController;
use App\Http\Controllers\File\FileController;
use App\Http\Controllers\Instructor\InstructorController;
use App\Http\Controllers\Apprentice\ApprenticeController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('Apprentice');
});
Route::get('workingsDaily',[WorkingDailyController::class, 'getWorkingDaily']);
Route::get('Files',[InstructorController::class, 'getFile']);
Route::post('Instructors/{id}',[InstructorController::class, 'inUpdates']);
Route::get('document_types',[ApprenticeController::class, 'tp']);
Route::get('genders',[ApprenticeController::class, 'gender']);
Route::resource('workingDaily', WorkingDailyController::class);
Route::resource('TrainingProgram', TrainingProgramController::class);
Route::resource('File', FileController::class);
Route::resource('Instructor', InstructorController::class);
Route::resource('Apprentice', ApprenticeController::class);

