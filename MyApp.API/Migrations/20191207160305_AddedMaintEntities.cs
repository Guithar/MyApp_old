using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyApp.API.Migrations
{
    public partial class AddedMaintEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MaintSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TenantId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    MonthsInterval = table.Column<int>(nullable: false),
                    ProductCategoryId = table.Column<int>(nullable: false),
                    IsActive = table.Column<bool>(nullable: true, defaultValue: true),
                    IsDeleted = table.Column<bool>(nullable: true, defaultValue: false),
                    CreatedOn = table.Column<DateTime>(nullable: true, defaultValueSql: "getdate()"),
                    UpdatedOn = table.Column<DateTime>(nullable: true, defaultValueSql: "getdate()"),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false),
                    DeletedBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintSchedules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MaintOperations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TenantId = table.Column<int>(nullable: false),
                    MaintScheduleId = table.Column<int>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Position = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: true),
                    CreatedOn = table.Column<DateTime>(nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: true),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false),
                    DeletedBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintOperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaintOperations_MaintSchedules_MaintScheduleId",
                        column: x => x.MaintScheduleId,
                        principalTable: "MaintSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaintSchedulesAssets",
                columns: table => new
                {
                    AssetId = table.Column<int>(nullable: false),
                    MaintScheduleId = table.Column<int>(nullable: false),
                    TenantId = table.Column<int>(nullable: false),
                    IsActive = table.Column<bool>(nullable: true, defaultValue: true),
                    IsDeleted = table.Column<bool>(nullable: true, defaultValue: false),
                    CreatedOn = table.Column<DateTime>(nullable: true, defaultValueSql: "getdate()"),
                    UpdatedOn = table.Column<DateTime>(nullable: true, defaultValueSql: "getdate()"),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false),
                    DeletedBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintSchedulesAssets", x => new { x.MaintScheduleId, x.AssetId });
                    table.ForeignKey(
                        name: "FK_MaintSchedulesAssets_Assets_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Assets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaintSchedulesAssets_MaintSchedules_MaintScheduleId",
                        column: x => x.MaintScheduleId,
                        principalTable: "MaintSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaintResults",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TenantId = table.Column<int>(nullable: false),
                    AssetId = table.Column<int>(nullable: false),
                    MaintScheduleId = table.Column<int>(nullable: false),
                    ExecutedBy = table.Column<int>(nullable: false),
                    ExecutedOn = table.Column<DateTime>(nullable: false),
                    NextInspectionDate = table.Column<DateTime>(nullable: false),
                    Observations = table.Column<string>(nullable: true),
                    Result = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true, defaultValue: true),
                    IsDeleted = table.Column<bool>(nullable: true, defaultValue: false),
                    CreatedOn = table.Column<DateTime>(nullable: true, defaultValueSql: "getdate()"),
                    UpdatedOn = table.Column<DateTime>(nullable: true, defaultValueSql: "getdate()"),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false),
                    DeletedBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaintResults_MaintSchedulesAssets_AssetId_MaintScheduleId",
                        columns: x => new { x.AssetId, x.MaintScheduleId },
                        principalTable: "MaintSchedulesAssets",
                        principalColumns: new[] { "MaintScheduleId", "AssetId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaintOperations_MaintScheduleId",
                table: "MaintOperations",
                column: "MaintScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_MaintResults_AssetId_MaintScheduleId",
                table: "MaintResults",
                columns: new[] { "AssetId", "MaintScheduleId" });

            migrationBuilder.CreateIndex(
                name: "IX_MaintSchedulesAssets_AssetId",
                table: "MaintSchedulesAssets",
                column: "AssetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaintOperations");

            migrationBuilder.DropTable(
                name: "MaintResults");

            migrationBuilder.DropTable(
                name: "MaintSchedulesAssets");

            migrationBuilder.DropTable(
                name: "MaintSchedules");
        }
    }
}
