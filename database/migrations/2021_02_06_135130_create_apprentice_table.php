<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApprenticeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apprentice', function (Blueprint $table) {
            $table->id('apprentice_id');
            $table->bigInteger('file_id')->unsigned();
            $table->string('document_number',15);
            $table->string('apprentice_name',80);
            $table->string('apprentice_surname',80);
            $table->string('apprentice_email',100)->unique();
            $table->date('birth_date');
            $table->string('apprentice_gender', 2);
            $table->string('document_type', 2);
            $table->timestamps();
            $table->softDeletes(); //Columna para soft delete
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
        Schema::dropIfExists('apprentice');
    }
}
