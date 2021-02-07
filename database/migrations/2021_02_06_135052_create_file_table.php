<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('file', function (Blueprint $table) {
            $table->id('file_id');
            $table->bigInteger('id_working_day')->unsigned();
            $table->bigInteger('id_training_program')->unsigned();
            $table->string('file_name',100);
            $table->string('status_file',2);
            $table->timestamps();
            $table->foreign('id_working_day')->references('working_day_id')->on('working_day')->onDelete('cascade');
            $table->foreign('id_training_program')->references('training_program_id')->on('training_program')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('file');
    }
}
