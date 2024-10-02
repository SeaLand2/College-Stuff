#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "clear.h"
#include "playermove.h"
#include "location.h"
#include "battle.h"
#include "load.h"
#include "colour.h"
#include "inventory.h"
#include "store.h"
 
int hp = 50, dmg = 2, mana = 50, game = 1;
int inventory[] = {0, 20, 0, 0, 0}; // sword, gold, HP potion, mana potion, spell

int main()
{
  srand(time(NULL));
  char input;
  int x,y;
  char map[8][8] = 
  {
    {'C', 's', 'c', 'w', 'y', 'l', 'i', 'l'},
    {'s', 's', 's', 'w', 'y', 'l', 'i', 'l'},
    {'I', 's', 's', 'w', 'f', 'l', 'B', 'l'},
    {'s', 's', 's', 'g', 'f', 'f', 'f', 'f'},
    {'h', 'b', 'G', 'w', 'f', 'f', 'f', 't'},
    {'w', 'w', 'w', 'w', 'f', 'f', 'f', 'm'},
    {'a', 'f', 'f', 'x', 'f', 'f', 'X', 'm'},
    {'a', 'f', 'f', 'x', 'f', 'f', 'm', 'm'},
  };
  x = 0;
  y = 2;
  
  load();

  playerMove(map, x, y, input);

  if (game != 1)
  {
    clrscr();
    printf("Thanks for playing");
    getchar();
  }
  return 0;
}