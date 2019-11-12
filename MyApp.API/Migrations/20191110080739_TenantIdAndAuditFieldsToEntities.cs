using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyApp.API.Migrations
{
    public partial class TenantIdAndAuditFieldsToEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_AspNetUsers_UserId",
                table: "Clients");

            migrationBuilder.DropIndex(
                name: "IX_Clients_UserId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Assets");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Clients",
                newName: "UpdatedBy");

            migrationBuilder.RenameColumn(
                name: "AssetID",
                table: "Clients",
                newName: "TenantId");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Products",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<int>(
                name: "DeletedBy",
                table: "Products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Products",
                nullable: true,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Products",
                nullable: true,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "Products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UpdatedBy",
                table: "Products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "Products",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "ProductCategories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "ProductCategories",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<int>(
                name: "DeletedBy",
                table: "ProductCategories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "ProductCategories",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "ProductCategories",
                nullable: true,
                defaultValue: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ProductCategories",
                nullable: true,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "ProductCategories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UpdatedBy",
                table: "ProductCategories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "ProductCategories",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Clients",
                nullable: true,
                defaultValue: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Clients",
                nullable: true,
                defaultValue: true,
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Clients",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Clients",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<int>(
                name: "DeletedBy",
                table: "Clients",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Clients",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "Clients",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Assets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "Assets",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<int>(
                name: "DeletedBy",
                table: "Assets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedOn",
                table: "Assets",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Assets",
                nullable: true,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "Assets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UpdatedBy",
                table: "Assets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "Assets",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "AspNetUsers",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AspNetUsers",
                nullable: true,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "AspNetUsers",
                nullable: true,
                defaultValueSql: "getdate()");

            migrationBuilder.CreateTable(
                name: "Tenants",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    NIF = table.Column<string>(nullable: true),
                    Host = table.Column<string>(nullable: true),
                    Plan = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
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
                    table.PrimaryKey("PK_Tenants", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clients_TenantId",
                table: "Clients",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_TenantId",
                table: "AspNetUsers",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Tenants_TenantId",
                table: "AspNetUsers",
                column: "TenantId",
                principalTable: "Tenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Tenants_TenantId",
                table: "Clients",
                column: "TenantId",
                principalTable: "Tenants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Tenants_TenantId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Tenants_TenantId",
                table: "Clients");

            migrationBuilder.DropTable(
                name: "Tenants");

            migrationBuilder.DropIndex(
                name: "IX_Clients_TenantId",
                table: "Clients");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_TenantId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "DeletedOn",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "Assets");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "UpdatedBy",
                table: "Clients",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "TenantId",
                table: "Clients",
                newName: "AssetID");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "Clients",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true,
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Clients",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true,
                oldDefaultValue: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Clients",
                nullable: false,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "Clients",
                nullable: false,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Assets",
                nullable: false,
                defaultValueSql: "getdate()");

            migrationBuilder.CreateIndex(
                name: "IX_Clients_UserId",
                table: "Clients",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_AspNetUsers_UserId",
                table: "Clients",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
