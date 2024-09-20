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

#include "etnk.h"

#include <stdlib.h>
#include <math.h>

#include "elite.h" 
#include "ssdl.h"
#include "vector.h"
#include "stars.h"
#include "random.h"

int warp_stars;

struct star
{
	double x;
	double y;
	double z;
};

struct star stars[20];

void create_new_stars (void)
{
	int i;
	int nstars;
	
	nstars = witchspace ? 3 : 12;

	for (i = 0; i < nstars; i++)
	{
//		stars[i].x = (rand255() - 128) | 8;
//		stars[i].y = (rand255() - 128) | 4;

		stars[i].x = (rand255() - 128);
		stars[i].y = (rand255() - 128);
		stars[i].z = rand255() | 0x90;
	}

	warp_stars = 0;
}


void front_starfield (void)
{
	int i;

	double Q;
	double delta;
	double alpha = 0;
	double beta = 0;
	double xx,yy,zz;

	int bx,by;
	int ex,ey;
	int sx,sy;
	int nstars;
	
	nstars = witchspace ? 3 : 12;

	delta = warp_stars ? 50 : flight_speed;

	alpha = (double)flight_roll;
	beta = (double)flight_climb;

	alpha /= 256.0;
	delta /= 2.0;
	
	for (i = 0; i < nstars; i++)
	{
		/* Plot the stars in their current locations... */

		sy = stars[i].y;
		sx = stars[i].x;
		zz = stars[i].z;

		bx = GFX_FULLVIEW_X_CENTER + sx * GFX_FULLVIEW_X_SCALE;
		by = GFX_FULLVIEW_Y_CENTER + sy * GFX_FULLVIEW_Y_SCALE;

		if ((!warp_stars) && 
			(bx >= GFX_FULLVIEW_L_COORD) && (bx <= GFX_FULLVIEW_R_COORD) &&
			(by >= GFX_FULLVIEW_T_COORD) && (by <= GFX_FULLVIEW_B_COORD))
		{
			gfx_plot_pixel (bx, by, GFX_COL_WHITE);
			if (zz < 0xC0) gfx_plot_pixel (bx + 1, by, GFX_COL_WHITE);
			if (zz < 0x90)
			{
				gfx_plot_pixel (bx, by + 1, GFX_COL_WHITE);
				gfx_plot_pixel (bx + 1, by + 1, GFX_COL_WHITE);
			}
		}

		/* Move the stars to their new locations...*/

		Q = delta / stars[i].z;

		stars[i].z -= delta;

		yy = stars[i].y + (stars[i].y * Q);
		xx = stars[i].x + (stars[i].x * Q);
		zz = stars[i].z;

		yy = yy + (xx * alpha);
		xx = xx - (yy * alpha);

/*
		tx = yy * beta;
		xx = xx + (tx * tx * 2);
*/

		yy = yy + beta;

		stars[i].y = yy;
		stars[i].x = xx;

		bx = GFX_FULLVIEW_X_CENTER + sx * GFX_FULLVIEW_X_SCALE;
		by = GFX_FULLVIEW_Y_CENTER + sy * GFX_FULLVIEW_Y_SCALE;

		ex = GFX_FULLVIEW_X_CENTER + xx * GFX_FULLVIEW_X_SCALE;
		ey = GFX_FULLVIEW_Y_CENTER + yy * GFX_FULLVIEW_Y_SCALE;

		if ( warp_stars ) gfx_draw_line (bx, by, ex, ey);
		
		sx = xx;
		sy = yy;

		if ((sx > 120) || (sx < -120) || (sy > 120) || (sy < -120) || (zz < 16))	
		{
//			stars[i].x = (rand255() - 128) | 8; // Set 4 bit
//			stars[i].y = (rand255() - 128) | 4; // Set 8 bit
			stars[i].x = (rand255() - 128);
			stars[i].y = (rand255() - 128);
			stars[i].z = rand255() | 0x90;  
			continue;
		}

	}

	warp_stars = 0;
}



void rear_starfield (void)
{
	int i;
	double Q;
	double delta;
	double alpha = 0;
	double beta = 0;
	double xx,yy,zz;
	int sx,sy;
	int bx,by;
	int ex,ey;
	int nstars;
	
	nstars = witchspace ? 3 : 12;

	delta = warp_stars ? 50 : flight_speed;	
	alpha = -flight_roll;
	beta = -flight_climb;

	alpha /= 256.0;
	delta /= 2.0;
	
	for (i = 0; i < nstars; i++)
	{
		/* Plot the stars in their current locations... */

		sy = stars[i].y;
		sx = stars[i].x;
		zz = stars[i].z;

		bx = GFX_FULLVIEW_X_CENTER + sx * GFX_FULLVIEW_X_SCALE;
		by = GFX_FULLVIEW_Y_CENTER + sy * GFX_FULLVIEW_Y_SCALE;

		if ((!warp_stars) &&
			(bx >= GFX_FULLVIEW_L_COORD) && (bx <= GFX_FULLVIEW_R_COORD) &&
			(by >= GFX_FULLVIEW_T_COORD) && (by <= GFX_FULLVIEW_B_COORD))
		{
			gfx_plot_pixel (bx, by, GFX_COL_WHITE);
			if (zz < 0xC0) gfx_plot_pixel (bx+1, by, GFX_COL_WHITE);
			if (zz < 0x90)
			{
				gfx_plot_pixel (bx, by+1, GFX_COL_WHITE);
				gfx_plot_pixel (bx+1, by+1, GFX_COL_WHITE);
			}
		}


		/* Move the stars to their new locations...*/

		Q = delta / stars[i].z;

		stars[i].z += delta;
		yy = stars[i].y - (stars[i].y * Q);
		xx = stars[i].x - (stars[i].x * Q);
		zz = stars[i].z;

		yy = yy + (xx * alpha);
		xx = xx - (yy * alpha);

/*
		tx = yy * beta;
		xx = xx + (tx * tx * 2);
*/
		yy = yy + beta;

		if (warp_stars)
		{
			bx = GFX_FULLVIEW_X_CENTER + sx * GFX_FULLVIEW_X_SCALE;
			by = GFX_FULLVIEW_Y_CENTER + sy * GFX_FULLVIEW_Y_SCALE;

			ex = GFX_FULLVIEW_X_CENTER + xx * GFX_FULLVIEW_X_SCALE;
			ey = GFX_FULLVIEW_Y_CENTER + yy * GFX_FULLVIEW_Y_SCALE;

			if ((bx >= GFX_FULLVIEW_L_COORD) && (bx <= GFX_FULLVIEW_R_COORD) &&
			   (by >= GFX_FULLVIEW_T_COORD) && (by <= GFX_FULLVIEW_B_COORD) &&
			   (ex >= GFX_FULLVIEW_L_COORD) && (ex <= GFX_FULLVIEW_R_COORD) &&
			   (ey >= GFX_FULLVIEW_T_COORD) && (ey <= GFX_FULLVIEW_B_COORD))
			gfx_draw_line (bx, by, ex, ey);
		}
		
		stars[i].y = yy;
		stars[i].x = xx;

		if ((zz >= 300) || (fabs(yy) >= 110))
		{
			stars[i].z = (rand255() & 127) + 51;
			
			if (rand255() & 1)
			{
				stars[i].x = rand255() - 128;
				stars[i].y = (rand255() & 1) ? -115 : 115;
			}
			else
			{
				stars[i].x = (rand255() & 1) ? -126 : 126;
				stars[i].y = rand255() - 128; 
			}
		}

	}

	warp_stars = 0;
}


void side_starfield (void)
{
	int i;
	double delta;
	double alpha;
	double beta;
	double xx,yy,zz;
	int sx;
	int sy;
	int ex;
	int ey;
	int bx;
	int by;
	double delt8;
	int nstars;
	
	nstars = witchspace ? 3 : 12;
	
	delta = warp_stars ? 50 : flight_speed;	
	alpha = flight_roll;
	beta = flight_climb;

	if (current_screen == SCR_LEFT_VIEW)
	{
		delta = -delta;
		alpha = -alpha;
		beta = -beta;
	} 
	
	for (i = 0; i < nstars; i++)
	{
		sy = stars[i].y;
		sx = stars[i].x;
		zz = stars[i].z;

		bx = GFX_FULLVIEW_X_CENTER + sx * GFX_FULLVIEW_X_SCALE;
		by = GFX_FULLVIEW_Y_CENTER + sy * GFX_FULLVIEW_Y_SCALE;

		if ((!warp_stars) &&
			(bx >= GFX_FULLVIEW_L_COORD) && (bx <= GFX_FULLVIEW_R_COORD) &&
			(by >= GFX_FULLVIEW_T_COORD) && (by <= GFX_FULLVIEW_B_COORD))
		{
			gfx_plot_pixel (bx, by, GFX_COL_WHITE);
			if (zz < 0xC0) gfx_plot_pixel (bx+1, by, GFX_COL_WHITE);
			if (zz < 0x90)
			{
				gfx_plot_pixel (bx, by+1, GFX_COL_WHITE);
				gfx_plot_pixel (bx+1, by+1, GFX_COL_WHITE);
			}
		}

		yy = stars[i].y;
		xx = stars[i].x;
		zz = stars[i].z;
		
		delt8 = delta / (zz / 32);
		xx = xx + delt8;

		xx += (yy * (beta / 256));		
		yy -= (xx * (beta / 256));

		xx += ((yy / 256) * (alpha / 256)) * (-xx);
		yy += ((yy / 256) * (alpha / 256)) * (yy);

		yy += alpha; 

		stars[i].y = yy;
		stars[i].x = xx;

		bx = GFX_FULLVIEW_X_CENTER + sx * GFX_FULLVIEW_X_SCALE;
		by = GFX_FULLVIEW_Y_CENTER + sy * GFX_FULLVIEW_Y_SCALE;

		ex = GFX_FULLVIEW_X_CENTER + xx * GFX_FULLVIEW_X_SCALE;
		ey = GFX_FULLVIEW_Y_CENTER + yy * GFX_FULLVIEW_Y_SCALE;

		if (warp_stars) gfx_draw_line (bx, by, ex, ey);
		if (fabs(stars[i].x) >= 116)
		{
			stars[i].y = rand255() - 128;
			stars[i].x = (current_screen == SCR_LEFT_VIEW) ? 115 : -115;
			stars[i].z = rand255();
		}
		else if (fabs(stars[i].y) >= 116)
		{
			stars[i].x = rand255() - 128;
			stars[i].y = (alpha > 0) ? -110 : 110;
			stars[i].z = rand255();
		} 

		
	}

	warp_stars = 0;
}


/*
 * When we change view, flip the stars over so they look like other stars.
 */

void flip_stars (void)
{
	int i;
	int nstars;
	int sx;
	int sy;
	
	nstars = witchspace ? 3 : 12;
	for (i = 0; i < nstars; i++)
	{
		sy = stars[i].y;
		sx = stars[i].x;
		stars[i].x = sy;
		stars[i].y = sx;
	}
}


void update_starfield (void)
{
	switch (current_screen)
	{
		case SCR_FRONT_VIEW:
		case SCR_INTRO_ONE:
		case SCR_INTRO_TWO:
		case SCR_ESCAPE_POD:
			front_starfield();
			break;
		
		case SCR_REAR_VIEW:
		case SCR_GAME_OVER:
			rear_starfield();
			break;
		
		case SCR_LEFT_VIEW:
		case SCR_RIGHT_VIEW:
			side_starfield();
			break;
	}
}
