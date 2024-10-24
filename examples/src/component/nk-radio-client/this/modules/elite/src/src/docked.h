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

#ifndef ETNK_DOCKED_H
#define ETNK_DOCKED_H

void display_short_range_chart (int coord_init);
void display_galactic_chart (int coord_init);
void display_data_on_planet (void);
void show_distance_to_planet (int coord_init);
void move_cursor_to_origin (void);
void find_planet_by_name (char *find_name);
void display_market_prices (int var_init);
void display_commander_status (void);
int  calc_distance_to_planet (struct galaxy_seed from_planet, struct galaxy_seed to_planet);
void highlight_stock (int i);
void select_previous_stock (void);
void select_next_stock (void);
void buy_stock (void);
void sell_stock (void);
void display_inventory (void);
void equip_ship (int var_init);
void select_next_equip (void);
void select_previous_equip (void);
void buy_equip (void);


extern int cross_x;
extern int cross_y;

#endif
