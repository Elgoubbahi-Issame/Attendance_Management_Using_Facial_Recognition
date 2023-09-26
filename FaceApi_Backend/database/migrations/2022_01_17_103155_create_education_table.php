<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
        
//let's add the foreign keys for this table

        Schema::table('education', function($table)
        {
            $table->bigInteger('classroom_id')->unsigned();
            $table->foreign('classroom_id')
                        ->references('classroom_id')
                        ->on('classrooms')
                        ->onDelete('cascade')
                        ->onUpdate('cascade');

            $table->bigInteger('module_id')->unsigned();
            $table->foreign('module_id')
                    ->references('module_id')
                    ->on('modules')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

            $table->bigInteger('teacher_id')->unsigned();
            $table->foreign('teacher_id')
                    ->references('teacher_id')
                    ->on('teachers')
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
        Schema::dropIfExists('education');
    }
}
