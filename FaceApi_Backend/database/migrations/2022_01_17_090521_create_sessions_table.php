<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->bigIncrements('session_id');
            $table->date('session_date');
            $table->time('start_hour');
            $table->time('end_hour');
            $table->timestamps();
        });

        Schema::table('sessions', function($table)
        {
            $table->unsignedBigInteger('module_id');
            $table->foreign('module_id')
                        ->references('module_id')
                        ->on('modules')
                        ->onDelete('cascade')
                        ->onUpdate('cascade');

            $table->unsignedBigInteger('teacher_id');
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
        Schema::dropIfExists('sessions');
    }
}
