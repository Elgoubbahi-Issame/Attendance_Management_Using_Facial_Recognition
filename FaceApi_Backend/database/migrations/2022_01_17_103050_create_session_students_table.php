<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSessionStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('session_students', function (Blueprint $table) {
            $table->bigIncrements('session_stud');
            $table->timestamps();
        });



//let's add the foreign keys for this table
        Schema::table('session_students', function($table)
        {
            $table->string('CIN');
            $table->foreign('CIN')
                        ->references('CIN')
                        ->on('students')
                        ->onDelete('cascade')
                        ->onUpdate('cascade');

            $table->bigInteger('session_id')->unsigned();
            $table->foreign('session_id')
                    ->references('session_id')
                    ->on('sessions')
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
        Schema::dropIfExists('session_students');
    }
}
