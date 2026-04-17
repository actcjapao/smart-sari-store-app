<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('store_id');

            $table->decimal('total_amount', 10, 2)->default(0.00);
            $table->string('payment_method')->default('cash'); // e.g., cash, card, gcash, etc.
            $table->decimal('payment_amount', 10, 2)->default(0.00);
            $table->decimal('change_amount', 10, 2)->default(0.00);

            $table->string('status')->default('completed'); // e.g., completed, error, etc.
            $table->text('notes')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
