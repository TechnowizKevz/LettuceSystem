@extends('layouts.app')

@section('title')
    LWS
@endsection

@section('content')
    <section class="section">
    <div class="section-header">
            <h3 class="page__heading">Sensor Configuration</h3>
            {{-- <div class="section-header-breadcrumb">
            <nav aria-label="breadcrumb">
              @include('layouts.breadcrum')
            </nav> --}}
            <!-- <button type="button" class="btn btn-primary" id="generateReport" >Generate Report <i class="far fa-file-invoice"></i></button> -->
            {{-- </div> --}}
        </div>
        <div class="section-body">
          <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4>Configuration Management</h4>
                  </div>
                  <div class="card-body p-4">
                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="pills-water_quality-tab" data-toggle="pill" href="#pills-water_quality" role="tab" aria-controls="pills-water_quality" aria-selected="true">Water Quality</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="pills-water_level-tab" data-toggle="pill" href="#pills-water_level" role="tab" aria-controls="pills-water_level" aria-selected="false">Water Level</a>
                      </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                      <div class="tab-pane fade show active" id="pills-water_quality" role="tabpanel" aria-labelledby="pills-water_quality-tab">
                        @include('sensorconfiguration.waterqualitysensorconfiguration.waterqualitysensorconfiguration')
                      </div>
                      <div class="tab-pane fade" id="pills-water_level" role="tabpanel" aria-labelledby="pills-water_level-tab">
                        @include('sensorconfiguration.waterlevelsensorconfiguration.waterlevelsensorconfiguration')
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </section>
@endsection

@section('javascript')
<script type="module" src="{{ asset('js/sensors_configuration/index.js') }}"></script>
@endsection
