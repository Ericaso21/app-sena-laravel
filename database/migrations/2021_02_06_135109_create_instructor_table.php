<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInstructorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('instructor', function (Blueprint $table) {
            $table->id('instructor_id');
            $table->bigInteger('file_id')->unsigned();
            $table->string('instructor_names',80);
            $table->string('surnames_instructor',80);
            $table->string('document_number',15);
            $table->string('profile_phote',225);
            $table->string('status_instructor',2);
            $table->timestamps();
            $table->foreign('file_id')->references('file_id')->on('file')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('instructor');
    }
}
