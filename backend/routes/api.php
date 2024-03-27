<?php

use Illuminate\Http\Request;
use App\Http\Controllers\CsvSchemaController;

Route::post('/upload-csv', [CsvSchemaController::class, 'uploadCsv']);