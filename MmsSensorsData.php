<?php

   include("InnovatechDbCrudFunctions.php");


   $waterlevelnameval="WaterLevel Sensor";
   $waterqualitynameval = "=WaterQuality Sensor";
   $waterlevellimitval;
   $waterlevelmaxval;
   $waterqualitystatusval;
   $waterlevelstatusval;
   $waterqualitylimitval;
   $waterqualitymaxval;


    $b = new InnovatechDbCrudFunctions();
    $b->select("sensorsconfigurations","*","id=1");
    $result = $b->sql;


    while ($row = mysqli_fetch_assoc($result)) { 
        $waterlevellimitval = $row['configuration_limit_value'];
        $waterlevelmaxval = $row['configuration_max_value'];
        $waterlevelstatusval = $row['isActive'];
    }

    $b->select("sensorsconfigurations","*","id=2");
    $result = $b->sql;


    while ($row = mysqli_fetch_assoc($result)) { 
        $waterqualitylimitval = $row['configuration_limit_value'];
        $waterqualitymaxval = $row['configuration_max_value'];
        $waterqualitystatusval = $row['isActive'];
    }

    echo $waterqualitynameval . '=' . $waterqualitylimitval . '=' .  $waterqualitymaxval . '=' . $waterqualitystatusval.':';
    echo $waterlevelnameval . '=' . $waterlevellimitval . '=' .  $waterlevelmaxval . '=' . $waterlevelstatusval.':';

    if(isset($_POST['waterquality'])){
        $dataWQ =$_POST['waterquality'];
        if($waterqualitystatusval==1){
            $waterqualstat;
            if($dataWQ<$waterqualitylimitval){
                $waterqualstat = 2;
            } else if($dataWQ>$waterqualitymaxval){
                $waterqualstat = 0;
            } else{
                $waterqualstat = 1;
            }
            $b->insert("waterqualities",[
             'phvalue'=>$dataWQ,
             'status'=>$waterqualstat,
            ]);
        }
    }

    if(isset($_POST['waterlevel'])){
        $dataWQ =$_POST['waterlevel'];
        if($waterlevelstatusval==1){
            $waterlevstat;
            if($dataWQ<$waterlevellimitval){
                $waterlevstat = 2;
            } else if($dataWQ>$waterlevellimitval){
                $waterlevstat = 0;
            } else{
                $waterlevstat = 1;
            }
            $b->insert("waterlevels",[
             'waterlevel'=>$dataWQ,
             'status'=>$waterlevstat,
            ]);
        }
    }
?>