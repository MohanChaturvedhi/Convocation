<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CsvSchema;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\DB;

class CsvSchemaController extends Controller
{
    public function uploadCsv(Request $request)
    {
        // Validation rules for the uploaded file
        $validator = Validator::make($request->all(), [
            'file' => 'required|mimes:csv,txt|max:4096', // Adjust max file size as needed
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        // Process the uploaded CSV file
        $file = $request->file('file');
        $csvData = array_map('str_getcsv', file($file));

        // Extract schema from CSV data
        $schema = array_shift($csvData);



        // Store the schema in the database
        $csvSchema = new CsvSchema();
        $csvSchema->schema = json_encode($schema); // Store schema as JSON

         // Start a transaction to save the CSV data
        DB::beginTransaction();

        try {
            // Save the schema to the database
            $csvSchema->save();

            // Save each row of data to the database
            foreach ($csvData as $row) {
                $rowData = new CsvSchema();
                $rowData->data = json_encode($row); // Store row data as JSON
                $rowData->save();
            }

            print_r('Data is Published , Commit');

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'CSV file uploaded and data stored successfully'], 200);
        } catch (\Exception $e) {
            // Rollback the transaction on error
            DB::rollback();
            print_r('Error , Data Rollback');
            return response()->json(['error' => 'Failed to store data in the database'], 500);
        }
    }

}
