<div class="card">
    <div class="card-body">
        <form id="temperatureSettingForm" class="needs-validation">
        @csrf
            <input type="hidden" name="id" id="id" value="1">
            <div class="row">
                <div class="col-md-4 text-center"> 
                    <img class="brand-image img-circle" src="{{ asset('img/waterlevel.jpeg') }}" width="200" height="180" />
                    <input type="hidden" id="ItemPixStr" name="ItemPixStr" value="prod.png">
                    <h4 id="currentwaterlevel"></h4>
                </div>
                <div class="col-md-8">
                    <div class="form-group col-12">
                        <label>Sensor Name</label>
                        <input type="text" class="form-control" name="sensor_name" id="sensor_name" value="Water Level Sensor" required disabled>
                    </div>
                    <div class="form-group col-12">
                        <label>Minimum Value</label>
                        <input type="number" class="form-control" name="configuration_limit_value" id="sensor_limit_value_q" required>
                    </div>
                    <div class="form-group col-12">
                        <label>Maximum Value</label>
                        <input type="number" class="form-control" name="configuration_max_value" id="sensor_max_value_q" required>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="card-footer text-right">
        <button class="btn btn-primary" id="updateWaterLevelSetting">Save Changes</button>
    </div>
</div>