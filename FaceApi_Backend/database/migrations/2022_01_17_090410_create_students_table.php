<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('student_id');
            $table->string('CIN')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->boolean('validation')->default(false);
            $table->string('image');
            $table->timestamps();
        });


        Schema::table('students', function($table)
        {
            $table->bigInteger('classroom_id')->unsigned();
            $table->foreign('classroom_id')
                        ->references('classroom_id')
                        ->on('classrooms')
                        ->onDelete('cascade')
                        ->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
