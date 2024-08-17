using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class user2_user_contact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Contact_User_Use2Id",
                table: "User_Contact");

            migrationBuilder.RenameColumn(
                name: "Use2Id",
                table: "User_Contact",
                newName: "User2Id");

            migrationBuilder.RenameIndex(
                name: "IX_User_Contact_Use2Id",
                table: "User_Contact",
                newName: "IX_User_Contact_User2Id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Contact_User_User2Id",
                table: "User_Contact",
                column: "User2Id",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Contact_User_User2Id",
                table: "User_Contact");

            migrationBuilder.RenameColumn(
                name: "User2Id",
                table: "User_Contact",
                newName: "Use2Id");

            migrationBuilder.RenameIndex(
                name: "IX_User_Contact_User2Id",
                table: "User_Contact",
                newName: "IX_User_Contact_Use2Id");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Contact_User_Use2Id",
                table: "User_Contact",
                column: "Use2Id",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
