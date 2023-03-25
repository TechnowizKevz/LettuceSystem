<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class SensorconfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sensorsconfigurations')->insert([
            [
              'id'   => 1, 
              'sensor_name'  => 'Water Level Sensor',
              'sensor_image'  => 'oysmush.webp',
              'configuration_limit_value'  => 20.5,
              'configuration_max_value'  => 100.5,
              'isActive'=>1,
            ],
            [
                'id'   => 2, 
                'sensor_name'  => 'Water Quality Sensor',
                'sensor_image'  => 'oysmush.webp',
                'configuration_limit_value'  => 20.5,
                'configuration_max_value'  => 100.5,
                'isActive'=>1,
              ]
        ]);
    }
}
