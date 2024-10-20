/*
 * Elite - The New Kind.
 *
 * Reverse engineered from the BBC disk version of Elite.
 * Additional material by C.J.Pinder.
 *
 * The original Elite code is (C) I.Bell & D.Braben 1984.
 * This version re-engineered in C by C.J.Pinder 1999-2001.
 *
 * email: <christian@newkind.co.uk>
 *
 *
 */

/*
 * Options.c
 */

#include "etnk.h"

#include <stdlib.h>
#include <string.h>

#include "elite.h"
#include "ssdl.h"
#include "options.h"
#include "main.h"
#include "docked.h"
#include "file.h" 

static int hilite_item;
 
#define NUM_OPTIONS 5
#define NUM_SETTINGS 7

#define OPTION_BAR_WIDTH	(400)
#define OPTION_BAR_HEIGHT	(12)

struct option
{
	char *text;
	int docked_only;
};

static struct option option_list[NUM_OPTIONS] =
{
	{"Save Commander",	1},
	{"Load Commander",	1},
	{"Game Settings",	0},
	{"Restart Game",        0},
	{"Quit",		0}	
};

struct setting
{
	char *name;
	char *value[5];
};

static struct setting setting_list[NUM_SETTINGS] =
{
	{"Graphics:",		{"Solid", "Wireframe", "", "", ""}},
	{"Anti Alias:",		{"Off", "On", "", "", ""}},		
	{"Planet Style:",	{"Wireframe", "Green", "SNES", "Fractal", ""}},
	{"Planet Desc.:",	{"BBC", "MSX", "", "", ""}},
	{"Instant Dock:",	{"Off", "On", "", "", ""}},
	{"Remap Keys:",         {"Off", "On", "", "", ""}},
	{"Save Settings",	{"", "", "", "", ""}}
};


void quit_screen (void)
{
	current_screen = SCR_QUIT;

	gfx_clear_display();
	gfx_display_centre_text (16, "GAME OPTIONS", 140, GFX_COL_GOLD);
	gfx_draw_line (GFX_VIEW_L_COORD, GFX_VIEW_T_COORD, GFX_VIEW_R_COORD, GFX_VIEW_T_COORD);

	gfx_display_centre_text (GFX_VIEW_Y_CENTER, "QUIT GAME (Y/N)?", 140, GFX_COL_GOLD);		
}


void restart_screen(void)
{
	current_screen = SCR_RESTART;

	gfx_clear_display();
	gfx_display_centre_text (16, "GAME OPTIONS", 140, GFX_COL_GOLD);
	gfx_draw_line (GFX_VIEW_L_COORD, GFX_VIEW_T_COORD, GFX_VIEW_R_COORD, GFX_VIEW_T_COORD);

	gfx_display_centre_text (GFX_VIEW_Y_CENTER, "RESTART GAME (Y/N)?", 140, GFX_COL_GOLD);		
}  


void display_setting_item (int item)
{
	int x,y;
	int v;

	if (item == (NUM_SETTINGS - 1))
	{
		y = ((NUM_SETTINGS + 1) / 2) * 30 + 96 + 32;
		gfx_display_centre_text (y, setting_list[item].name, 120, GFX_COL_WHITE);
		return;
	}
	
	switch (item)
	{
		case 0:
			v = wireframe;
			break;
		
		case 1:
			v = anti_alias_gfx;
			break;
		
		case 2:
			v = planet_render_style;
			break;
		
		case 3:
			v = hoopy_casinos;
			break;
		
		case 4:
			v = instant_dock;
			break;

	        case 5:
		  v = remap_keys;
		  break;

		default:
			v = 0;
			break;
	}
	
	x = (item & 1) * 250 + 32; 
	y = (item / 2) * 30 + 96;
	
	gfx_display_colour_text (x, y, setting_list[item].name, GFX_COL_WHITE);
	gfx_display_colour_text (x + 120, y, setting_list[item].value[v], GFX_COL_WHITE);
}


void highlight_setting (int item)
{
	int x,y;
	int width;
	
	if ((hilite_item != -1) && (hilite_item != item))
	{
		if (hilite_item == (NUM_SETTINGS - 1))
		{
			x = GFX_X_CENTER - (OPTION_BAR_WIDTH / 2);
			y = ((NUM_SETTINGS + 1) / 2) * 30 + 96 + 32;
			width = OPTION_BAR_WIDTH;
		}
		else
		{
			x = (hilite_item & 1) * 250 + 32 + 120; 
			y = (hilite_item / 2) * 30 + 96;
			width = 100;
		}

		gfx_clear_area (x, y - 6, x + width, y + OPTION_BAR_HEIGHT);
		display_setting_item (hilite_item);		
	}

	if (item == (NUM_SETTINGS - 1))
	{
		x = GFX_X_CENTER - (OPTION_BAR_WIDTH / 2);
		y = ((NUM_SETTINGS + 1) / 2) * 30 + 96 + 32;
		width = OPTION_BAR_WIDTH;
	}
	else
	{
		x = (item & 1) * 250 + 32 + 120; 
		y = (item / 2) * 30 + 96;
		width = 100;
	}
	
	gfx_draw_filledrect (x, y - 6, x + width, y + 12, GFX_COL_DARK_RED);
	display_setting_item (item);		
	hilite_item = item;
}



void select_left_setting (void)
{
	if ((hilite_item & 1) != 0)
		highlight_setting (hilite_item - 1);
}

void select_right_setting (void)
{
	if (((hilite_item & 1) == 0) && (hilite_item < (NUM_SETTINGS - 1)))
		highlight_setting (hilite_item + 1);
}


void select_up_setting (void)
{
	if (hilite_item == (NUM_SETTINGS - 1))
	{
		highlight_setting (NUM_SETTINGS - 2);
		return;
	}

	if (hilite_item > 1)
		highlight_setting (hilite_item - 2);
}


void select_down_setting (void)
{
	if (hilite_item == (NUM_SETTINGS - 2))
	{
		highlight_setting (NUM_SETTINGS - 1);
		return;
	}
	
	if (hilite_item < (NUM_SETTINGS - 2))
		highlight_setting (hilite_item + 2);
}

void toggle_setting (void)
{
	if (hilite_item == (NUM_SETTINGS - 1))
	{
		write_config_file();
		display_options(hilite_item);
		return;
	}

	switch (hilite_item)
	{
		case 0:
			wireframe ^= 1;
			break;
		
		case 1:
			anti_alias_gfx ^= 1;
			break;
		
		case 2:
			planet_render_style = (planet_render_style + 1) % 4;
			break;
		
		case 3:
			hoopy_casinos ^= 1;
			break;

		case 4:
			instant_dock ^= 1;
			break;

	        case 5:
		        remap_keys ^= 1;
			break;
	}

	highlight_setting (hilite_item);
}


void game_settings_screen (int var_init)
{
	int i;

	current_screen = SCR_SETTINGS;

	gfx_clear_display();
	gfx_display_centre_text (16, "GAME SETTINGS", 140, GFX_COL_GOLD);
	gfx_draw_line (GFX_VIEW_L_COORD, GFX_VIEW_T_COORD, GFX_VIEW_R_COORD, GFX_VIEW_T_COORD);

	for (i = 0; i < NUM_SETTINGS; i++)
	{
		display_setting_item (i);
	}

	if ( var_init ) {
		hilite_item = -1;
		highlight_setting (0);
	} else {
        highlight_setting (hilite_item);
	}

}


void display_option_item (int i)
{
	int y;
	int col;
	
	y = ((wnd_height - 128) - (30 * NUM_OPTIONS)) / 2;
	y += i * 30;
	col = ((!docked) && option_list[i].docked_only) ? GFX_COL_GREY_1 : GFX_COL_WHITE;

	gfx_display_centre_text (y, option_list[i].text, 120, col);
}


void highlight_option (int i)
{
	int y;
	int x;
	
	if ((hilite_item != -1) && (hilite_item != i))
	{
		x = GFX_X_CENTER - (OPTION_BAR_WIDTH / 2);
		y = ((wnd_height - 128) - (30 * NUM_OPTIONS)) / 2;
		y += hilite_item * 30;
		gfx_clear_area (x, y - 6, x + OPTION_BAR_WIDTH, y + OPTION_BAR_HEIGHT);
		display_option_item (hilite_item);		
	}

	x = GFX_X_CENTER - (OPTION_BAR_WIDTH / 2);
	y = ((wnd_height - 128) - (30 * NUM_OPTIONS)) / 2;
	y += i * 30;
	
	gfx_draw_filledrect (x, y - 6, x + OPTION_BAR_WIDTH, y + OPTION_BAR_HEIGHT, GFX_COL_DARK_RED);
	display_option_item (i);		

	hilite_item = i;
}

void select_previous_option (void)
{
	if (hilite_item > 0) highlight_option (hilite_item - 1);
}

void select_next_option (void)
{
	if (hilite_item < (NUM_OPTIONS - 1)) highlight_option (hilite_item + 1);
}


void do_option (void)
{
	printf("do_option: %d\n", hilite_item);

	if ((!docked) && option_list[hilite_item].docked_only)
		return;

	switch (hilite_item)
	{
		case 0:
			save_commander_screen();
			break;
			
		case 1:
			load_commander_screen();
			display_commander_status();
			break;
		
		case 2:
			game_settings_screen(1);
			break;

		case 3:
			restart_screen();
			break;
		
		case 4:
			quit_screen();
			break;
	}
}


void display_options (int var_init)
{
	int i;

	current_screen = SCR_OPTIONS;

	gfx_clear_display();
	gfx_display_centre_text (16, "GAME OPTIONS", 140, GFX_COL_GOLD);
	gfx_draw_line (GFX_VIEW_L_COORD, GFX_VIEW_T_COORD, GFX_VIEW_R_COORD, GFX_VIEW_T_COORD);

	gfx_display_centre_text (GFX_WINDOW_B_COORD - 120, "Version: Release 1.0", 120, GFX_COL_WHITE); // 300
	gfx_display_centre_text (GFX_WINDOW_B_COORD - 100, "www.newkind.co.uk", 120, GFX_COL_WHITE); // 320
	gfx_display_centre_text (GFX_WINDOW_B_COORD - 80, "Written by Christian Pinder 1999-2001", 120, GFX_COL_WHITE); // 340
	gfx_display_centre_text (GFX_WINDOW_B_COORD - 60, "Based on original code by Ian Bell & David Braben", 120, GFX_COL_WHITE); //360
	
	for (i = 0; i < NUM_OPTIONS; i++) display_option_item (i);

	if ( var_init == 1 )
	{
		hilite_item = -1;
		highlight_option (0);
	} 
	else 
	{
		highlight_option (hilite_item);	
	}
}
