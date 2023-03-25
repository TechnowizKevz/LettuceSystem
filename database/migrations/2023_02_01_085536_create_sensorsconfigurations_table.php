<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSensorsconfigurationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sensorsconfigurations', function (Blueprint $table) {
            $table->id();
            $table->string("sensor_name");
            $table->string("sensor_image")->default("bg4.jpg");
            $table->double("configuration_limit_value");
            $table->double("configuration_max_value");
            $table->integer("isActive")->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sensorsconfigurations');
    }
}
