<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkingDayTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('working_day', function (Blueprint $table) {
            $table->id('working_day_id');
            $table->string('working_day_name', 40);
            $table->string('acrony_wd', 4);
            $table->timestamps();
            $table->softDeletes(); //Columna para soft delete
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('working_day');
    }
}
