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
 * main.c
 *
 * Main game handler.
 */

#include "etnk.h"

#include <stdio.h>
#include <string.h>
#include <math.h> 
#include <ctype.h>
#include <time.h>
#include <stdlib.h>

#include "ssdl.h"
#include "main.h"
#include "vector.h"
#include "elite.h"
#include "docked.h"
#include "intro.h"
#include "shipdata.h"
#include "shipface.h"
#include "space.h"
#include "sound.h"
#include "threed.h"
#include "swat.h"
#include "random.h"
#include "options.h"
#include "stars.h"
#include "missions.h"
#include "pilot.h"
#include "file.h"
#include "keyboard.h"
#include "space.h"

int old_cross_x, old_cross_y;
int cross_timer;

int draw_lasers;
int mcount;
int message_count;
char message_string[80];
int rolling;
int climbing;
int game_paused;
#ifdef HACKING
int identify;
#endif
int scanner_zoom = 1;
int remap_keys;

int find_input;
char find_name[20];

int venableconsole = TRUE;
int venablescreenname = FALSE;
int venablesecondchart = TRUE;
int venablefirstchart = TRUE;

void secondary_main();
/*
 * Initialise the game parameters.
 */

void initialise_game(void)
{
	set_rand_seed (time(NULL));
	current_screen = SCR_INTRO_ONE;

	restore_saved_commander();

	flight_speed = 1;
	flight_roll = 0;
	flight_climb = 0;
	docked = 1;
	front_shield = 255;
	aft_shield = 255;
	energy = 255;
	draw_lasers = 0;
	mcount = 0;
	hyper_ready = 0;
	detonate_bomb = 0;
	find_input = 0;
	witchspace = 0;
	game_paused = 0;
	auto_pilot = 0;
	
	create_new_stars();
	clear_universe();
	
	cross_x = -1;
	cross_y = -1;
	cross_timer = 0;

	
	myship.max_speed = 40;		/* 0.27 Light Mach */
	myship.max_roll = 31;
	myship.max_climb = 8;		/* CF 8 */
	myship.max_fuel = 70;		/* 7.0 Light Years */
}


void finish_game (void)
{
	finish = 1;
	game_over = 2;
}

/*
 * Move the planet chart cross hairs to specified position.
 */

void move_cross (int dx, int dy)
{
	cross_timer = 5;
	if (kbd_ctrl_pressed) {
	  dx *= 4;
	  dy *= 4;
	}
	if (current_screen == SCR_SHORT_RANGE) {
		cross_x += (dx * 4);
		cross_y += (dy * 4);
		if (cross_x < GFX_VIEW_L_COORD) cross_x = GFX_VIEW_L_COORD;
		if (cross_x >= GFX_VIEW_R_COORD - 1) cross_x = GFX_VIEW_R_COORD - 1;
		if (cross_y <= GFX_VIEW_T_COORD + 1) cross_y = GFX_VIEW_T_COORD + 1;
		if (cross_y > GFX_VIEW_B_COORD) cross_y = GFX_VIEW_B_COORD;
	} else if (current_screen == SCR_GALACTIC_CHART) {
		cross_x += (dx * 2);
		cross_y += (dy * 2);
		if (cross_x < GFX_VIEW_L_COORD) cross_x = GFX_VIEW_L_COORD;
		if (cross_x >= GFX_VIEW_R_COORD - 1) cross_x = GFX_VIEW_R_COORD - 1;
		if (cross_y <= GFX_VIEW_T_COORD + 1) cross_y = GFX_VIEW_T_COORD + 1;
		if (cross_y > GFX_VIEW_B_COORD) cross_y = GFX_VIEW_B_COORD;
	}
}


/*
 * Draw the cross hairs at the specified position.
 */

void draw_cross (int cx, int cy)
{
	if (current_screen == SCR_SHORT_RANGE) {
		show_distance_to_planet(0);
		gfx_set_clip_region (GFX_VIEW_L_COORD, GFX_VIEW_T_COORD + 1, GFX_VIEW_R_COORD - 1, GFX_VIEW_B_COORD );
		gfx_draw_colour_line (cx - 16, cy, cx + 16, cy, GFX_COL_RED);
		gfx_draw_colour_line (cx, cy - 16, cx, cy + 16, GFX_COL_RED);
	} else if (current_screen == SCR_GALACTIC_CHART) {
		show_distance_to_planet(0);
		gfx_set_clip_region (GFX_VIEW_L_COORD, GFX_VIEW_T_COORD + 1, GFX_VIEW_R_COORD - 1, GFX_VIEW_B_COORD );
		gfx_draw_colour_line(cx - 8, cy, cx + 8, cy, GFX_COL_RED);
		gfx_draw_colour_line(cx, cy - 8, cx, cy + 8, GFX_COL_RED);
	}
}



void draw_laser_sights(void)
{
	int laser = 0;
	int x1,y1,x2,y2;
	
	switch (current_screen)
	{
		case SCR_FRONT_VIEW:
			gfx_display_centre_text (32, "Front View", 120, GFX_COL_WHITE);
			laser = cmdr.front_laser;
			break;
		
		case SCR_REAR_VIEW:
			gfx_display_centre_text (32, "Rear View", 120, GFX_COL_WHITE);
			laser = cmdr.rear_laser;
			break;

		case SCR_LEFT_VIEW:
			gfx_display_centre_text (32, "Left View", 120, GFX_COL_WHITE);
			laser = cmdr.left_laser;
			break;

		case SCR_RIGHT_VIEW:
			gfx_display_centre_text (32, "Right View", 120, GFX_COL_WHITE);
			laser = cmdr.right_laser;
			break;
	}
	

	if (laser)
	{
		x1 = wnd_width / 2;
		y1 = ((wnd_height / 2 - 132)-16);
		y2 = ((wnd_height / 2 - 132)-32);
   
		gfx_draw_colour_line (x1-1, y1, x1-1, y2, GFX_COL_GREY_1); 
		gfx_draw_colour_line (x1, y1, x1, y2, GFX_COL_WHITE);
		gfx_draw_colour_line (x1+1, y1, x1+1, y2, GFX_COL_GREY_1); 

		y1 = ((wnd_height / 2 - 132)+16);
		y2 = ((wnd_height / 2 - 132)+32);
		
		gfx_draw_colour_line (x1-1, y1, x1-1, y2, GFX_COL_GREY_1); 
		gfx_draw_colour_line (x1, y1, x1, y2, GFX_COL_WHITE);
		gfx_draw_colour_line (x1+1, y1, x1+1, y2, GFX_COL_GREY_1); 

		x1 = (wnd_width / 2) - 16;
		y1 = (wnd_height / 2 - 132);
		x2 = (wnd_width / 2) - 32;
		   
		gfx_draw_colour_line (x1, y1-1, x2, y1-1, GFX_COL_GREY_1); 
		gfx_draw_colour_line (x1, y1, x2, y1, GFX_COL_WHITE);
		gfx_draw_colour_line (x1, y1+1, x2, y1+1, GFX_COL_GREY_1); 

		x1 = (wnd_width / 2) + 16;
		x2 = (wnd_width / 2) + 32;

		gfx_draw_colour_line (x1, y1-1, x2, y1-1, GFX_COL_GREY_1); 
		gfx_draw_colour_line (x1, y1, x2, y1, GFX_COL_WHITE);
		gfx_draw_colour_line (x1, y1+1, x2, y1+1, GFX_COL_GREY_1); 
	}
}


static void roll_left(void)
{
  if (flight_roll < 0)
    flight_roll = 0;
  else
  {
    increase_flight_roll();
    increase_flight_roll();
    rolling = 1;
  }
}

static void roll_right(void)
{
  if (flight_roll > 0)
    flight_roll = 0;
  else
  {
    decrease_flight_roll();
    decrease_flight_roll();
    rolling = 1;
  }
}

static void climb(void)
{
  if (flight_climb < 0)
    flight_climb = 0;
  else
  {
    increase_flight_climb();
  }
  climbing = 1;
}

static void dive(void)
{
  if (flight_climb > 0)
    flight_climb = 0;
  else
  {
    decrease_flight_climb();
  }
  climbing = 1;
}

void arrow_right (void)
{
	switch (current_screen)
	{
		case SCR_MARKET_PRICES:
			buy_stock();
			break;
		
		case SCR_SETTINGS:
			select_right_setting();
			break;

		case SCR_SHORT_RANGE:
		case SCR_GALACTIC_CHART:
			move_cross(1, 0);
			break;

		case SCR_FRONT_VIEW:
		  roll_right();
		  break;
		case SCR_REAR_VIEW:
		  if (remap_keys) roll_left(); else roll_right();
		  break;
		case SCR_RIGHT_VIEW:
		  if (remap_keys) climb(); else roll_right();
		  break;
		case SCR_LEFT_VIEW:
		  if (remap_keys) dive(); else roll_right();
		  break;
	}
}


void arrow_left (void)
{
	switch (current_screen)
	{
		case SCR_MARKET_PRICES:
			sell_stock();
			break;
		case SCR_SETTINGS:
			select_left_setting();
			break;
		case SCR_SHORT_RANGE:
		case SCR_GALACTIC_CHART:
			move_cross (-1, 0);
			break;
		case SCR_FRONT_VIEW:
			roll_left();
			break;
		case SCR_REAR_VIEW:
			if (remap_keys) roll_right(); else roll_left();
			break;
		case SCR_RIGHT_VIEW:
			if (remap_keys) dive(); else roll_left();
			break;
		case SCR_LEFT_VIEW:
			if (remap_keys) climb(); else roll_left();
			break;
	}
}


void arrow_up (void)
{
	switch (current_screen)
	{
		case SCR_MARKET_PRICES:
			select_previous_stock();
			break;

		case SCR_EQUIP_SHIP:
			select_previous_equip();
			break;

		case SCR_OPTIONS:
			select_previous_option();
			break;

		case SCR_SETTINGS:
			select_up_setting();
			break;
		
		case SCR_SHORT_RANGE:
		case SCR_GALACTIC_CHART:
			move_cross (0, -1);
			break;

		case SCR_FRONT_VIEW:
		  dive();
		  break;
		case SCR_REAR_VIEW:
		  if (remap_keys) climb(); else dive();
		  break;
		case SCR_RIGHT_VIEW:
		  if (remap_keys) roll_right(); else dive();
		  break;
		case SCR_LEFT_VIEW:
		  if (remap_keys) roll_left(); else dive();
		  break;
	}
}



void arrow_down (void)
{
	switch (current_screen)
	{
		case SCR_MARKET_PRICES:
			select_next_stock();
			break;

		case SCR_EQUIP_SHIP:
			select_next_equip();
			break;
		
		case SCR_OPTIONS:
			select_next_option();
			break;

		case SCR_SETTINGS:
			select_down_setting();
			break;
		
		case SCR_SHORT_RANGE:
		case SCR_GALACTIC_CHART:
			move_cross (0, 1);
			break;

		case SCR_FRONT_VIEW:
		  climb();
		  break;
		case SCR_REAR_VIEW:
		  if (remap_keys) dive(); else climb();
		  break;
		case SCR_RIGHT_VIEW:
		  if (remap_keys) roll_left(); else climb();
		  break;
		case SCR_LEFT_VIEW:
		  if (remap_keys) roll_right(); else climb();
		  break;

	}
}

void return_pressed (void)
{
	switch (current_screen)
	{
		case SCR_EQUIP_SHIP:
			buy_equip();
			break;
		
		case SCR_OPTIONS:
			do_option();
			break;

		case SCR_SETTINGS:
			toggle_setting();
			break;
	}	
}

void y_pressed (void)
{
	switch (current_screen)
	{
		case SCR_QUIT:
			finish_game();
			break;
		case SCR_RESTART:
		  game_over = 2;
		  break;
	}
}

void n_pressed (void)
{
	switch (current_screen)
	{
		case SCR_QUIT:
		case SCR_RESTART:
			if (docked)
				display_commander_status();
			else
				current_screen = SCR_FRONT_VIEW;
			break;
	}
}

void d_pressed (void)
{
	switch (current_screen)
	{
		case SCR_GALACTIC_CHART:
		case SCR_SHORT_RANGE:
    		show_distance_to_planet(1);
			break;
		
		case SCR_FRONT_VIEW:
		case SCR_REAR_VIEW:
		case SCR_RIGHT_VIEW:
		case SCR_LEFT_VIEW:
			if (auto_pilot)
				disengage_auto_pilot();
			break;
	}
}

void f_pressed (void)
{
	if ((current_screen == SCR_GALACTIC_CHART) || (current_screen == SCR_SHORT_RANGE)) {
		find_input = 1;
		*find_name = '\0';
		gfx_clear_text_area();
		gfx_display_text (16, (wnd_height - 132 ) - 40, "Planet Name?");
	}
}

void add_find_char (int letter)
{
	char str[40];
	if (strlen (find_name) == 16) return;
	str[0] = toupper (letter);
	str[1] = '\0';
	strcat (find_name, str);
	sprintf (str, "Planet Name? %s", find_name);		
	gfx_clear_text_area ();
	gfx_display_text(16, (wnd_height - 132 ) - 40, str);
}

void delete_find_char (void)
{
	char str[40];
	int len;

	len = strlen (find_name);
	if (len == 0) return;
		
	find_name[len - 1] = '\0';	
	sprintf (str, "Planet Name? %s", find_name);

	gfx_clear_text_area();
	gfx_display_text(16, (wnd_height - 132 ) - 40, str);
}

void o_pressed()
{
	switch (current_screen)
	{
		case SCR_GALACTIC_CHART:
		case SCR_SHORT_RANGE:
    		move_cursor_to_origin();
			break;
	}
}


void auto_dock (void)
{
	struct univ_object ship;

	ship.location.x = 0;
	ship.location.y = 0;
	ship.location.z = 0;
	
	set_init_matrix (ship.rotmat);
	ship.rotmat[2].z = 1;
	ship.rotmat[0].x = -1;
	ship.type = -96;
	ship.velocity = flight_speed;
	ship.acceleration = 0;
	ship.bravery = 0;
	ship.rotz = 0;
	ship.rotx = 0;

	auto_pilot_ship (&ship);

	if (ship.velocity > 22)
		flight_speed = 22;
	else
		flight_speed = ship.velocity;
	
	if (ship.acceleration > 0)
	{
		flight_speed++;
		if (flight_speed > 22)
			flight_speed = 22;
	}

	if (ship.acceleration < 0)
	{
		flight_speed--;
		if (flight_speed < 1)
			flight_speed = 1;
	}	

	if (ship.rotx == 0)
		flight_climb = 0;
	
	if (ship.rotx < 0)
	{
		increase_flight_climb();

		if (ship.rotx < -1)
			increase_flight_climb();
	}
	
	if (ship.rotx > 0)
	{
		decrease_flight_climb();

		if (ship.rotx > 1)
			decrease_flight_climb();
	}
	
	if (ship.rotz == 127)
		flight_roll = -14;
	else
	{
		if (ship.rotz == 0)
			flight_roll = 0;

		if (ship.rotz > 0)
		{
			increase_flight_roll();

			if (ship.rotz > 1)
				increase_flight_roll();
		}
		
		if (ship.rotz < 0)
		{
			decrease_flight_roll();

			if (ship.rotz < -1)
				decrease_flight_roll();
		}
	}
}


void run_escape_sequence (void)
{
	int i;
	int newship;
	Matrix rotmat;
	
	current_screen = SCR_ESCAPE_POD;
	
	flight_speed = 1;
	flight_roll = 0;
	flight_climb = 0;

	set_init_matrix (rotmat);
	rotmat[2].z = 1.0;
	
	newship = add_new_ship (SHIP_COBRA3, 0, 0, 200, rotmat, -127, -127);
	universe[newship].velocity = 7;
	snd_play_sample (SND_LAUNCH);

	for (i = 0; i < 90; i++)
	{
		if (i == 40)
		{
			universe[newship].flags |= FLG_DEAD;
			snd_play_sample (SND_EXPLODE);
		}

		gfx_set_clip_region (1, 1, wnd_width - 2, (wnd_height - 129));
		gfx_clear_display();
		update_starfield();
		update_universe();

		universe[newship].location.x = 0;
		universe[newship].location.y = 0;
		universe[newship].location.z += 2;

		gfx_display_centre_text (358, "Escape pod launched - Ship auto-destuct initiated.", 120, GFX_COL_WHITE);
		
		update_console();
		//gfx_update_screen();
	}

	
	while ((ship_count[SHIP_CORIOLIS] == 0) && (ship_count[SHIP_DODEC] == 0))
	{
		auto_dock();

		if ((abs(flight_roll) < 3) && (abs(flight_climb) < 3))
		{
			for (i = 0; i < MAX_UNIV_OBJECTS; i++)
			{
				if (universe[i].type != 0)
					universe[i].location.z -= 1500;
			}

		}

		warp_stars = 1;
		gfx_set_clip_region (1, 1, wnd_width - 2, (wnd_height - 129));
		gfx_clear_display();
		update_starfield();
		update_universe();
		update_console();
		//gfx_update_screen();
	}

	abandon_ship();
}

static int cheat_arg = 0;
static void check_cheat_keys(void)
{
  int i;

  if (!kbd_ctrl_pressed)
    return;

  for (i = 0; i < 10; i++) {
    if (old_key[KEY_0 + i] == 1) {
      cheat_arg = cheat_arg * 10 + i;
      goto ok;
    }
  }

  if (old_key[KEY_c] == 1)
    goto done;

  if (docked)
    return;

  if (old_key[KEY_s] == 1) {
    if (cheat_arg < NO_OF_SHIPS) {
      int un = create_other_ship(cheat_arg);
      if (un != -1)
	universe[un].flags |= FLG_TARGET;
      goto done;
    }
  }

  if (old_key[KEY_d] == 1) {
    game_paused = 0;
    snd_play_sample (SND_DOCK);					
    dock_player();
    current_screen = SCR_BREAK_PATTERN;
    goto done;
  }

  return;
done:
  cheat_arg = 0;
ok:
  snd_play_sample(SND_BEEP);
  return;
}

void handle_flight_keys (void)
{
	int keyasc;

/*	
	if (docked &&
		((current_screen == SCR_MARKET_PRICES) ||
		(current_screen == SCR_OPTIONS) ||
		(current_screen == SCR_SETTINGS) ||
		(current_screen == SCR_EQUIP_SHIP))
	)
	{
//		handle_sdl_events();
		int key_pressed = keypressed();

		kbd_enter_pressed = 0;
		kbd_backspace_pressed = 0;
	
		int keycode = key_pressed >> 8;
		if (keycode == KEY_RETURN) kbd_enter_pressed = 1;
		if (keycode == KEY_BACKSPACE) kbd_backspace_pressed = 1;
	}
*/
	// FIXME: no joy yet ...
#if 0
	if (have_joystick)
	{	
		poll_joystick();	

		if (joy[0].stick[0].axis[1].d1)
			arrow_up();
		
		if (joy[0].stick[0].axis[1].d2)
			arrow_down();

		if (joy[0].stick[0].axis[0].d1)
			arrow_left();

		if (joy[0].stick[0].axis[0].d2)
			arrow_right();
		
		if (joy[0].button[0].b)
			kbd_fire_pressed = 1;

		if (joy[0].button[1].b)
			kbd_inc_speed_pressed = 1;

		if (joy[0].button[2].b)
			kbd_dec_speed_pressed = 1;
	}
#endif

	
	if (game_paused)
	{
		if (kbd_resume_pressed)
			game_paused = 0;
		else
		  check_cheat_keys();
		return;
	}
		
	if (kbd_F1_pressed)
	{
		find_input = 0;
		
		if (docked)
			launch_player();
		else
		{
			if (current_screen != SCR_FRONT_VIEW)
			{
				current_screen = SCR_FRONT_VIEW;
				flip_stars();
			}
		}
	}

	if (kbd_F2_pressed)
	{
		find_input = 0;
		
		if (!docked)
		{
			if (current_screen != SCR_REAR_VIEW)
			{
				current_screen = SCR_REAR_VIEW;
				flip_stars();
			}
		}
	}

	if (kbd_F3_pressed)
	{
		find_input = 0;
		
		if (!docked)
		{
			if (current_screen != SCR_LEFT_VIEW)
			{
				current_screen = SCR_LEFT_VIEW;
				flip_stars();
			}
		}
	}

	if (kbd_F4_pressed)
	{
		find_input = 0;
		
		if (docked)
			equip_ship(1);
		else
		{
			if (current_screen != SCR_RIGHT_VIEW)
			{
				current_screen = SCR_RIGHT_VIEW;
				flip_stars();
			}
		}
	}
	
	if (kbd_F5_pressed)
	{
		find_input = 0;
		old_cross_x = -1;
		display_galactic_chart(1);
	}

	if (kbd_F6_pressed)
	{
		find_input = 0;
		old_cross_x = -1;
		display_short_range_chart(1);
	}

	if (kbd_F7_pressed)
	{
		find_input = 0;
		display_data_on_planet();
	}

	if (kbd_F8_pressed && (!witchspace))
	{
		find_input = 0;
		display_market_prices(1);
	}	

	if (kbd_F9_pressed)
	{
		find_input = 0;
		display_commander_status();
	}

	if (kbd_F10_pressed)
	{
		find_input = 0;
		display_inventory();
	}
	
	if (kbd_F11_pressed)
	{
		find_input = 0;
		display_options(1);
	}

	if (find_input)
	{
		keyasc = kbd_read_key();
		
		if (kbd_enter_pressed)
		{
			find_input = 0;
			find_planet_by_name (find_name);
			return;
		}

		if (kbd_backspace_pressed)
		{
			delete_find_char();
			return;
		}

		if (isalpha(keyasc))
			add_find_char (keyasc);

		return;		
	}
	
	if (kbd_y_pressed) y_pressed();

	if (kbd_n_pressed) n_pressed();

#ifdef HACKING
	if (kbd_i_pressed == 1)
	  identify = !identify;
#endif
	if (kbd_zoom_pressed == 1)
	  scanner_zoom ^= 3;
 
	if (kbd_fire_pressed)
	{
		if ((!docked) && (draw_lasers == 0))
			draw_lasers = fire_laser();
	}

	if (kbd_dock_pressed)
	{
		if (!docked && cmdr.docking_computer)
		{
		  if ((universe[1].type == SHIP_CORIOLIS ||
		       universe[1].type == SHIP_DODEC) &&
		      (universe[1].flags & FLG_ANGRY))
		    info_message("Docking permission refused");
		  else	if (instant_dock)
		    engage_docking_computer();
		  else
		    engage_auto_pilot();
		}
	}

	if (kbd_d_pressed) d_pressed();
	
	if (kbd_ecm_pressed)
	{
		if (!docked && cmdr.ecm)
			activate_ecm(1);
	}

	if (kbd_find_pressed) f_pressed ();
	
	if (kbd_hyperspace_pressed && (!docked))
	{
		if (kbd_ctrl_pressed)
			start_galactic_hyperspace();
		else
			start_hyperspace();
	}

	if (kbd_jump_pressed && (!docked) && (!witchspace))
	{
		jump_warp();
	}
	
	if (kbd_fire_missile_pressed)
	{
		if (!docked)
			fire_missile();
	}

	if (kbd_origin_pressed)
		o_pressed();

	if (kbd_pause_pressed) {
	        cheat_arg = 0;
		game_paused = 1;
	}
	
	if (kbd_target_missile_pressed)
	{
		if (!docked)
			arm_missile();		
	}

	if (kbd_unarm_missile_pressed)
	{
		if (!docked)
			unarm_missile();
	}
	
	if (kbd_inc_speed_pressed)
	{
		if (!docked)
		{
			if (flight_speed < myship.max_speed)
				flight_speed++;
		}
	}

	if (kbd_dec_speed_pressed)
	{
		if (!docked)
		{
			if (flight_speed > 1)
				flight_speed--;
		}
	}

	if (kbd_up_pressed) arrow_up();
	
	if (kbd_down_pressed) arrow_down();

	if (kbd_left_pressed) arrow_left();
		
	if (kbd_right_pressed) arrow_right();
	
	if (kbd_enter_pressed) return_pressed();

	if (kbd_energy_bomb_pressed && kbd_ctrl_pressed)
	{
		if ((!docked) && (cmdr.energy_bomb))
		{
			detonate_bomb = 1;
			cmdr.energy_bomb = 0;
		}
	}		

	if (kbd_escape_pressed && kbd_ctrl_pressed)
	{
		if ((!docked) && (cmdr.escape_pod) && (!witchspace))
			run_escape_sequence();
	}
}


static char *get_filename ( const char *path )
{
	const char *p = path;
	while (*path) {
		if (*path == '/' || *path == '\\')
			p = path + 1;
		path++;
	}
	return (char*)p;
}



void set_commander_name (char *path)
{
	char *fname, *cname;
	int i;
	
	fname = get_filename (path);
	cname = cmdr.name;

	for (i = 0; i < 31; i++)
	{
		if (!isalnum(*fname))
			break;
		
		*cname++ = toupper(*fname++);
	}	

	*cname = '\0';
}


void save_commander_screen (void)
{
	char path[255];
	int okay;
	int rv;
	
	current_screen = SCR_SAVE_CMDR;

	gfx_clear_display();
	gfx_display_centre_text (10, "SAVE COMMANDER", 140, GFX_COL_GOLD);
	gfx_draw_line (0, 36, wnd_width - 1, 36);
	//gfx_update_screen();
	
	strcpy (path, cmdr.name);
	strcat (path, ".nkc");
	
	okay = gfx_request_file ("Save Commander", path, "nkc");
	
	if (!okay)
	{
		display_options(0);
		return;
	}

	rv = save_commander_file (path);

	if (rv)
	{
		gfx_display_centre_text (175, "Error Saving Commander!", 140, GFX_COL_GOLD);
		return;
	}
	
	gfx_display_centre_text (175, "Commander Saved.", 140, GFX_COL_GOLD);

	set_commander_name (path);
	saved_cmdr = cmdr;
	saved_cmdr.ship_x = docked_planet.d;
	saved_cmdr.ship_y = docked_planet.b;
}


void load_commander_screen (void)
{
	char path[255];
	int rv;

	gfx_clear_display();
	gfx_display_centre_text (10, "LOAD COMMANDER", 140, GFX_COL_GOLD);
	gfx_draw_line (0, 36, wnd_width - 1, 36);
	//gfx_update_screen();
	
	
	strcpy (path, "jameson.nkc");
	
	rv = gfx_request_file ("Load Commander", path, "nkc");

	if (rv == 0)
		return;

	rv = load_commander_file (path);

	if (rv)
	{
		saved_cmdr = cmdr;
		gfx_display_centre_text (175, "Error Loading Commander!", 140, GFX_COL_GOLD);
		gfx_display_centre_text (200, "Press any key to continue.", 140, GFX_COL_GOLD);
		//gfx_update_screen();
		readkey();
		return;
	}
	
	restore_saved_commander();
	set_commander_name (path);
	saved_cmdr = cmdr;
	update_console();
}



void run_first_intro_screen (void)
{


}



void run_second_intro_screen (void)
{

}



/*
 * Draw the game over sequence. 
 */

void run_game_over_screen()
{
	int i;
	int newship;
	Matrix rotmat;
	int type;
	
	current_screen = SCR_GAME_OVER;
	gfx_set_clip_region (1, 1, wnd_width - 2, (wnd_height - 129));
	
	flight_speed = 6;
	flight_roll = 0;
	flight_climb = 0;
#ifdef HACKING
	identify = 0;
#endif
	clear_universe();

	set_init_matrix (rotmat);

	newship = add_new_ship (SHIP_COBRA3, 0, 0, -400, rotmat, 0, 0);
	universe[newship].flags |= FLG_DEAD;

	for (i = 0; i < 5; i++)
	{
		type = (rand255() & 1) ? SHIP_CARGO : SHIP_ALLOY;
		newship = add_new_ship (type, (rand255() & 63) - 32,
								(rand255() & 63) - 32, -400, rotmat, 0, 0);
		universe[newship].rotz = ((rand255() * 2) & 255) - 128;
		universe[newship].rotx = ((rand255() * 2) & 255) - 128;
		universe[newship].velocity = rand255() & 15;
	}
	
	
	for (i = 0; i < 100; i++)
	{
		gfx_clear_display();
		update_starfield();
		update_universe();
		gfx_display_centre_text (190, "GAME OVER", 140, GFX_COL_GOLD);
		//gfx_update_screen();
	}
}

/*
 * Draw a break pattern (for launching, docking and hyperspacing).
 * Just draw a very simple one for the moment.
 */

void display_break_pattern (void)
{
	int i;

	gfx_set_clip_region (1, 1, wnd_width - 2, (wnd_height - 129));
	gfx_clear_display();
	
	for (i = 0; i < 20; i++) {
		gfx_set_clip_region (1, 1, wnd_width - 2, (wnd_height - 129));	// put it here, to avoid overdraw console etc with circles when they are big enough
		gfx_draw_circle (wnd_width / 2, ( wnd_height - 128 ) / 2, 30 + i * 15, GFX_COL_WHITE);
		//gfx_update_screen();
	}	

	if (docked) {
		check_mission_brief();
		display_commander_status();
		update_console();
	} else {
		current_screen = SCR_FRONT_VIEW;
	}
}

void info_message (char *message)
{
	strcpy (message_string, message);
	message_count = 37;
	/* snd_play_sample (SND_BEEP); */
}

unsigned int parts = 1;
unsigned int startup_part = 0;

void main_process()
{
	unsigned int change = 0;

	gfx_set_clip_region (0, 0, GFX_WINDOW_WIDTH - 1, GFX_WINDOW_HEIGHT - 1);

	if ( venablescreenname == TRUE ) {
		gfx_display_centre_text (20, "Hello for Sergey Zababurin", 120, GFX_COL_GOLD);
	}

	handle_sdl_events();
	kbd_check_keys();

	secondary_main();

	gfx_set_clip(GFX_SCANNER_L_COORD, GFX_SCANNER_T_COORD, GFX_SCANNER_R_COORD, GFX_SCANNER_B_COORD);

	if ( venableconsole == TRUE ) {
		gfx_draw_scanner();

		display_speed();
		display_flight_climb();
		display_flight_roll();

		display_shields();
		display_altitude();
		display_energy();
		display_cabin_temp();
		display_laser_temp();
		display_fuel();
		display_missiles();

		update_condition();

		if (!docked) {
			update_scanner();
			update_compass();
			display_condition();

			char buf[5];
			sprintf(buf, "x%d", scanner_zoom);
			gfx_display_text(zoom_x, zoom_y, buf);
	
			if (ship_count[SHIP_CORIOLIS] || ship_count[SHIP_DODEC]) gfx_draw_sprite (IMG_BIG_S, 387, 490);
			if (ecm_active) gfx_draw_sprite (IMG_BIG_E, 115, 490);
		}

	} else {
		gfx_clear_scanner();
		gfx_display_centre_text (GFX_VIEW_B_COORD - 20, "Hello for Sergey Zababurin", 120, GFX_COL_GOLD);
	}

	gfx_update_screen();
}


void secondary_main()
{
	if ( parts == 1 ) {
		game_over = 0;	
	
		initialise_game();
		dock_player();
	
		startup_part = 0;
		parts = 2;
		return;
	} else if ( parts == 2 ) {
		///////////////////////////////////////////////////////////////
		// intro 1
		///////////////////////////////////////////////////////////////
		if ( startup_part == 0 ) {
			current_screen = SCR_INTRO_ONE;

			snd_play_midi (SND_ELITE_THEME, TRUE);
			initialise_intro1();

			#ifdef HACKING
				identify = 0;
			#endif

			startup_part = 1;
			return;
		} else if ( startup_part == 1 ) {
			update_intro1();
			if (kbd_y_pressed) {
				snd_stop_midi();	
				load_commander_screen();
				startup_part = 0xffff;
			}	
			if (kbd_n_pressed) { 
				snd_stop_midi();	
				startup_part = 0xffff;
			}
			return;
		}
		startup_part = 0;
		parts = 3;
		return;
	} else if ( parts == 3 ) {
		///////////////////////////////////////////////////////////////
		// intro 2
		///////////////////////////////////////////////////////////////
		if ( startup_part == 0 ) {
			current_screen = SCR_INTRO_TWO;
			snd_play_midi (SND_BLUE_DANUBE, TRUE);

		#ifdef HACKING
			identify = 0;
		#endif

			initialise_intro2();

			flight_speed = 3;
			flight_roll = 0;
			flight_climb = 0;

			startup_part = 1;
			return;
		} else if ( startup_part == 1 ) {
			update_intro2();
			if (kbd_space_pressed) {
				snd_stop_midi();	
				startup_part = 0xffff;
			}			
			return;
		} 
		startup_part = 0;
		parts = 4;
		return;
	} else if ( parts == 4 ) {
		old_cross_x = -1;
		old_cross_y = -1;
		display_commander_status ();
		startup_part = 0;
		parts = 5;
		return;
	} else if ( parts == 5 && !game_over ) {
		int key_pressed = kbd_check_keys();


		rolling = 0;
		climbing = 0;

		///////////////////////////////////////////////////////////////
		// Менюхи
		///////////////////////////////////////////////////////////////


		handle_flight_keys ();	
		if ( current_screen == SCR_EQUIP_SHIP ) {
			equip_ship (0);
		} else if ( current_screen == SCR_SHORT_RANGE ) {
			display_short_range_chart (0);
		} else if ( current_screen == SCR_GALACTIC_CHART ) {
			display_galactic_chart (0);
		} else if ( current_screen == SCR_PLANET_DATA ) {
			display_data_on_planet();
		} else if ( current_screen == SCR_MARKET_PRICES ) {
			display_market_prices(0);
		} else if ( current_screen == SCR_CMDR_STATUS ) {
			display_commander_status ();
		} else if ( current_screen == SCR_INVENTORY ) {
			display_inventory();
		} else if ( current_screen == SCR_OPTIONS ) {
			display_options(0);
		} else if ( current_screen == SCR_QUIT ) {
			quit_screen();
		} else if ( current_screen == SCR_RESTART ) {
			restart_screen();
		} else if ( current_screen == SCR_SETTINGS ) {
			game_settings_screen(0);
		}

		if (game_paused) return;
		if (message_count > 0) message_count--;

		if (!rolling) {
			if (flight_roll > 0) decrease_flight_roll();
			if (flight_roll < 0) increase_flight_roll();
		}

		if (!climbing) {
			if (flight_climb > 0) decrease_flight_climb();
			if (flight_climb < 0) increase_flight_climb();
		}

		if (!docked)
		{
			///////////////////////////////////////////////////////////////
			// Полет, вне базы...
			///////////////////////////////////////////////////////////////

			gfx_set_clip_region (GFX_WINDOW_L_COORD, GFX_WINDOW_T_COORD, GFX_WINDOW_R_COORD, GFX_WINDOW_B_COORD);
			gfx_draw_simplerect(GFX_WINDOW_L_COORD, GFX_WINDOW_T_COORD, GFX_WINDOW_R_COORD, GFX_WINDOW_B_COORD, GFX_COL_WHITE);

//			gfx_acquire_screen();
					
			if ((current_screen == SCR_FRONT_VIEW) || (current_screen == SCR_REAR_VIEW) ||
				(current_screen == SCR_LEFT_VIEW) || (current_screen == SCR_RIGHT_VIEW) ||
				(current_screen == SCR_INTRO_ONE) || (current_screen == SCR_INTRO_TWO) ||
				(current_screen == SCR_GAME_OVER))
			{
				//gfx_clear_display();
				update_starfield();
			}

			if (auto_pilot)
			{
				auto_dock();
				if ((mcount & 127) == 0)
					info_message ("Docking Computers On");
			}

			update_universe ();

			if (docked)
			{
				update_console();
				gfx_release_screen();
				return;
			}

			if ((current_screen == SCR_FRONT_VIEW) || (current_screen == SCR_REAR_VIEW) ||
				(current_screen == SCR_LEFT_VIEW) || (current_screen == SCR_RIGHT_VIEW))
			{
				if (draw_lasers)
				{
					draw_laser_lines();
					draw_lasers--;
				}
					
				draw_laser_sights();
			}

			if (message_count > 0)
				gfx_display_centre_text (358, message_string, 120, GFX_COL_WHITE);
					
			if (hyper_ready)
			{
				display_hyper_status();
				if ((mcount & 3) == 0)
				{
					countdown_hyperspace();
				}
			}

			gfx_release_screen();
			
				mcount--;
				if (mcount < 0)
					mcount = 255;

				if ((mcount & 7) == 0)
					regenerate_shields();

				if ((mcount & 31) == 10)
				{
					if (energy < 50)
					{
						info_message ("ENERGY LOW");
						snd_play_sample (SND_BEEP);
					}

					update_altitude();
				}
				
				if ((mcount & 31) == 20)
					update_cabin_temp();
					
				if ((mcount == 0) && (!witchspace))
					random_encounter();
					
				cool_laser();				
				time_ecm();

				update_console();
		}

		if (current_screen == SCR_BREAK_PATTERN) display_break_pattern();

		if (( venablesecondchart == TRUE && current_screen == SCR_SHORT_RANGE ) || 
			( venablefirstchart == TRUE && current_screen == SCR_GALACTIC_CHART ))
		{

			if ( current_screen == SCR_SHORT_RANGE || current_screen == SCR_GALACTIC_CHART ) 
			{

				if (cross_timer > 0)
				{
					cross_timer--;
					if (cross_timer == 0)
					{
	    					show_distance_to_planet(1);
					}
				}

				old_cross_x = cross_x;
				old_cross_y = cross_y;
				
				draw_cross (old_cross_x, old_cross_y);
			}
		}

		return;
	} 
	else if ( parts == 5 && game_over < 2 ) 
	{
		run_game_over_screen();
		startup_part = 0;
		parts = 1;
		return;
	}
}



int enablesecondchart( int _state ) {
	venablesecondchart = _state;
	if ( current_screen == SCR_SHORT_RANGE ) {
		find_input = 0;
		old_cross_x = -1;
		display_short_range_chart (1);
	}
	return TRUE;
}

int enablefirstchart( int _state ) {
	venablefirstchart = _state;
	if ( current_screen == SCR_GALACTIC_CHART ) {
		find_input = 0;
		old_cross_x = -1;
		display_galactic_chart (1);
	}
	return TRUE;
}

int enableconsole( int _state ) {
	venableconsole = _state;
	return TRUE;
}

int enablescreenname( int _state ) {
	venablescreenname = _state;
	return TRUE;
}

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_KEEPALIVE
int SetGameParameter( char* _variable, char* _state ) {
	printf( "SetGameParameter: variable[\"%s\"]=%s\n", _variable, _state );
	if ( strcmp( _variable, "enableconsole" ) == 0 ) {
		if ( strcmp( _state, "enable" ) == 0 ) {
			return enableconsole( TRUE );
		} else if ( strcmp( _state, "disable" ) == 0 ) {
			return enableconsole( FALSE );
		} 
		return SBAD;
	} if ( strcmp( _variable, "enablescreen-name" ) == 0 ) {
		if ( strcmp( _state, "enable" ) == 0 ) {
			return enablescreenname( TRUE );
		} else if ( strcmp( _state, "disable" ) == 0 ) {
			return enablescreenname( FALSE );
		} 
		return SBAD;
	} if ( strcmp( _variable, "enablefirstchart" ) == 0 ) {
		if ( strcmp( _state, "enable" ) == 0 ) {
			return enablefirstchart( TRUE );
		} else if ( strcmp( _state, "disable" ) == 0 ) {
			return enablefirstchart( FALSE );
		} 
		return SBAD;
	} if ( strcmp( _variable, "enablesecondchart" ) == 0 ) {
		if ( strcmp( _state, "enable" ) == 0 ) {
			return enablesecondchart( TRUE );
		} else if ( strcmp( _state, "disable" ) == 0 ) {
			return enablesecondchart( FALSE );
		} 
		return SBAD;
	}


	return VBAD;
}
#endif


int main ( int argc, char *argv[] )
{
	if ( start_sdl() ) {
		printf( "FATAL: coudn't start SDL library's feature\n" );
		return 1;
	}

	/* Read configuration, it also applies default values, if no config can be read */
	read_config_file();

	if ( gfx_graphics_startup() ) {
		printf( "FATAL: coudn't start video mode\n" );
		return 1;
	}
	
	/* Start the sound system... */
	if ( snd_sound_startup() ) printf( "AUDIO: we will continue without any sounds\n" );

	/* Start the midi sound system... */
	if ( midi_sound_startup() ) printf( "MIXER: we will continue without midi sounds\n" );

	/* Do any setup necessary for the keyboard... */
	// #pragma deprecated(kbd_keyboard_startup)
	// if ( kbd_keyboard_startup() ) printf( "KEYBOARD: event watcher failed\n" );
	
	finish = 0;
	auto_pilot = 0;

        #ifdef __EMSCRIPTEN__
	    emscripten_set_main_loop(main_process, 0, 1);
        #else
            while (!finish) {        
		main_process();
            }
	#endif

	return 0;
}
